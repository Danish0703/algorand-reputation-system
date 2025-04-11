import SignClient from '@walletconnect/sign-client';
import { WalletConnectModal } from '@walletconnect/modal';
import { SessionTypes } from '@walletconnect/types';
import { getSdkError } from '@walletconnect/utils';
import type { AlgoWallet } from './algo-wallet';

// Define constants
// Get WalletConnect Project ID from environment variable or use a default for development
const PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';
const ALGORAND_CHAIN = 'algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k';
const REQUIRED_METHODS = ['algorand_signTransaction', 'algorand_signTxn'];
const REQUIRED_EVENTS = ['chainChanged', 'accountsChanged'];

/**
 * WalletConnect implementation of the AlgoWallet interface
 */
export class WalletConnectProvider implements AlgoWallet {
  private signClient: SignClient | null = null;
  private session: SessionTypes.Struct | null = null;
  private modal: WalletConnectModal | null = null;
  private walletAddress: string | null = null;
  private isInitialized = false;

  /**
   * Initialize WalletConnect client
   * This should be called early in the application lifecycle
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize SignClient
      this.signClient = await SignClient.init({
        projectId: PROJECT_ID,
        metadata: {
          name: 'AlgoTrust Reputation System',
          description: 'Reputation scoring system with Soulbound NFTs on Algorand',
          url: window.location.origin,
          icons: [`${window.location.origin}/icon.png`]
        }
      });

      // Initialize Modal
      this.modal = new WalletConnectModal({
        projectId: PROJECT_ID,
        chains: [ALGORAND_CHAIN],
        themeMode: 'light'
      });

      // Setup event listeners
      this.setupEventListeners();

      this.isInitialized = true;
      console.log('WalletConnect initialized successfully');
    } catch (error) {
      console.error('Failed to initialize WalletConnect:', error);
      
      // Provide more detailed error messages based on common failure cases
      if (PROJECT_ID === 'YOUR_PROJECT_ID') {
        throw new Error('Failed to initialize WalletConnect: Missing project ID. Please obtain a project ID from WalletConnect Cloud.');
      } else if (error instanceof Error && error.message.includes('fetch')) {
        throw new Error('Failed to initialize WalletConnect: Network connection error. Please check your internet connection.');
      } else {
        throw new Error(`Failed to initialize WalletConnect: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  /**
   * Setup WalletConnect event listeners
   */
  private setupEventListeners(): void {
    if (!this.signClient) return;

    // Session events
    this.signClient.on('session_event', (args) => {
      const { event } = args.params;
      console.log('session_event', event);
      
      if (event.name === 'accountsChanged') {
        // Handle account change
        const accounts = event.data as string[];
        if (accounts.length > 0) {
          this.walletAddress = accounts[0];
        }
      }
    });

    // Session update events
    this.signClient.on('session_update', ({ topic, params }) => {
      console.log('session_update', params);
      
      const { namespaces } = params;
      if (namespaces.algorand) {
        const algorandAddress = namespaces.algorand.accounts[0].split(':')[2];
        this.walletAddress = algorandAddress;
      }
    });

    // Session deletion events
    this.signClient.on('session_delete', () => {
      console.log('session_delete');
      this.resetState();
    });
  }

  /**
   * Reset the provider state
   */
  private resetState(): void {
    this.session = null;
    this.walletAddress = null;
  }

  /**
   * Connect to a wallet
   * @returns The connected wallet address
   */
  async connect(): Promise<string> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.signClient) {
        throw new Error('WalletConnect not initialized');
      }

      // Check if there's an existing session
      const existingSessions = this.signClient.session.getAll();
      if (existingSessions.length > 0) {
        this.session = existingSessions[0];
        
        // Get Algorand account from the session
        const algorandNamespace = this.session.namespaces.algorand;
        if (algorandNamespace && algorandNamespace.accounts.length > 0) {
          const account = algorandNamespace.accounts[0];
          this.walletAddress = account.split(':')[2]; // Format: 'algorand:mainnet:ADDRESS'
          return this.walletAddress;
        }
      }

      // Create a new session
      const { uri, approval } = await this.signClient.connect({
        requiredNamespaces: {
          algorand: {
            methods: REQUIRED_METHODS,
            chains: [ALGORAND_CHAIN],
            events: REQUIRED_EVENTS,
          }
        }
      });

      // Open the WalletConnect modal if there's a URI
      if (uri && this.modal) {
        this.modal.openModal({ uri });
      }

      // Wait for session approval
      const session = await approval();
      this.session = session;
      
      // Close the modal after connection
      if (this.modal) {
        this.modal.closeModal();
      }

      // Get Algorand account from the session
      const algorandNamespace = session.namespaces.algorand;
      if (algorandNamespace && algorandNamespace.accounts.length > 0) {
        const account = algorandNamespace.accounts[0];
        this.walletAddress = account.split(':')[2]; // Format: 'algorand:mainnet:ADDRESS'
        
        console.log('Connected to wallet:', this.walletAddress);
        return this.walletAddress;
      }
      
      throw new Error('No Algorand account found in connected wallet');
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      this.resetState();
      if (this.modal) {
        this.modal.closeModal();
      }
      
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message.includes('rejected')) {
          throw new Error('Connection rejected by user');
        } else if (error.message.includes('timeout')) {
          throw new Error('Connection timed out - please try again');
        } else if (error.message.includes('not installed')) {
          throw new Error('No compatible wallet found - please install an Algorand wallet app');
        } else {
          throw new Error(`Failed to connect: ${error.message}`);
        }
      } else {
        throw new Error('Failed to connect to wallet');
      }
    }
  }

  /**
   * Disconnect from the wallet
   * @returns A promise that resolves when disconnection is complete
   */
  async disconnect(): Promise<void> {
    try {
      if (!this.signClient || !this.session) {
        this.resetState();
        return;
      }

      await this.signClient.disconnect({
        topic: this.session.topic,
        reason: getSdkError('USER_DISCONNECTED'),
      });

      this.resetState();
      console.log('Disconnected from wallet');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      this.resetState();
    }
  }

  /**
   * Sign a transaction
   * @param txn The transaction to sign
   * @returns The signed transaction
   */
  async signTransaction(txn: any): Promise<any> {
    try {
      if (!this.signClient || !this.session || !this.walletAddress) {
        throw new Error('Wallet not connected');
      }

      // Note: This is a simplified implementation
      // Actual implementation depends on the transaction format
      const result = await this.signClient.request({
        topic: this.session.topic,
        chainId: ALGORAND_CHAIN,
        request: {
          method: 'algorand_signTransaction',
          params: [
            {
              txn: Buffer.from(JSON.stringify(txn)).toString('base64')
            }
          ]
        }
      });

      return result;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw new Error('Failed to sign transaction');
    }
  }

  /**
   * Get the wallet's balance
   * @returns The wallet balance in microAlgos
   */
  async getBalance(): Promise<number> {
    // In a real implementation, this would make an API call to an Algorand node
    // For this demo, we'll return a mock balance
    
    if (!this.walletAddress) {
      throw new Error('Wallet not connected');
    }
    
    try {
      // Ideally, make API call to Algorand indexer or node to get balance
      // For demo, return mock value
      return 50000000; // 50 Algos
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error('Failed to fetch balance');
    }
  }
}

// Export a singleton instance
export const walletConnectProvider = new WalletConnectProvider();