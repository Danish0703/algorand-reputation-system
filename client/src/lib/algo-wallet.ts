/**
 * This file contains utilities for connecting to Algorand wallet providers.
 * Integrates with WalletConnect for real wallet connections or uses a mock wallet for development.
 */

import { walletConnectProvider } from './wallet-connect';

export interface AlgoWallet {
  connect: () => Promise<string>;
  disconnect: () => void;
  signTransaction: (txn: any) => Promise<any>;
  getBalance: () => Promise<number>;
}

export class MockAlgoWallet implements AlgoWallet {
  private connected: boolean = false;
  private address: string = "ALGO1234567890XXXX";
  
  async connect(): Promise<string> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    this.connected = true;
    return this.address;
  }
  
  disconnect(): void {
    this.connected = false;
  }
  
  async signTransaction(txn: any): Promise<any> {
    if (!this.connected) {
      throw new Error("Wallet not connected");
    }
    
    // Simulate signing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      ...txn,
      signature: "mocksignature",
      txID: "MOCKID" + Math.random().toString(36).substring(2, 10).toUpperCase()
    };
  }
  
  async getBalance(): Promise<number> {
    if (!this.connected) {
      throw new Error("Wallet not connected");
    }
    
    // Mock balance
    return 1250.45;
  }
}

// Flag to control whether to use the real WalletConnect provider or the mock wallet
// Use WalletConnect if the project ID is available, otherwise fall back to mock
const USE_REAL_WALLET = Boolean(import.meta.env.VITE_WALLETCONNECT_PROJECT_ID) || 
                        import.meta.env.PROD || 
                        import.meta.env.VITE_USE_REAL_WALLET === 'true';

let wallet: AlgoWallet | null = null;

export const getWallet = (): AlgoWallet => {
  if (wallet) return wallet;
  
  if (USE_REAL_WALLET) {
    // Initialize WalletConnect provider
    walletConnectProvider.initialize().catch(console.error);
    wallet = walletConnectProvider;
  } else {
    // Use mock wallet for development
    wallet = new MockAlgoWallet();
  }
  
  return wallet;
};

export const disconnectWallet = async (): Promise<void> => {
  if (wallet) {
    await wallet.disconnect();
    wallet = null;
  }
};
