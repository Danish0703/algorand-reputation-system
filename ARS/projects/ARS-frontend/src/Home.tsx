// src/Home.tsx
import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/ConnectWallet';
import Account from './components/Account';
import AppCalls from './components/AppCalls';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect();

const Home: React.FC = () => {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  useEffect(() => {
    // Reconnect to session when component mounts
    peraWallet.reconnectSession().then(accounts => {
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
        setIsCreator(accounts[0] === CONTRACT_CREATOR_ADDRESS);
      }
    });

    // Setup event listeners
    peraWallet.on('connect', (accounts) => {
      setConnectedAccount(accounts[0]);
      setIsCreator(accounts[0] === CONTRACT_CREATOR_ADDRESS);
    });

    peraWallet.on('disconnect', () => {
      setConnectedAccount(null);
      setIsCreator(false);
    });

    // Cleanup listeners on unmount
    return () => {
      peraWallet.removeAllListeners();
    };
  }, []); 
}; // The comment highlights the conceptual improvement. The code remains the same.

  const handleConnect = (accounts: string[]) => {
    if (accounts.length > 0) {
      setConnectedAccount(accounts[0]);
      setIsCreator(accounts[0] === CONTRACT_CREATOR_ADDRESS);
    }
  };

  const handleDisconnect = () => {
    setConnectedAccount(null);
    setIsCreator(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Reputation System dApp</h1>
        <ConnectWallet
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          connectedAccount={connectedAccount}
        />
      </header>

      <main className="main-content">
        <Account address={connectedAccount} />
        <AppCalls
          connectedAccount={connectedAccount}
          isCreator={isCreator}
          creatorAddress={CONTRACT_CREATOR_ADDRESS}
        />
      </main>

      <footer className="footer">
        <p>&copy; 2025 Reputation System dApp</p>
      </footer>
    </div>
  );
};

export default Home;
