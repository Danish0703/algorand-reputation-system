// src/Home.tsx
import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/ConnectWallet';
import Account from './components/Account';
import AppCalls from './components/AppCalls';
import { getAccountAddress } from './utils/algorand';

const CONTRACT_CREATOR_ADDRESS = "YOUR_CONTRACT_CREATOR_ADDRESS_HERE";

const Home: React.FC = () => {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  useEffect(() => {
    const checkConnectedAccount = async () => {
      const account = await getAccountAddress();
      setConnectedAccount(account);
      if (account) {
        setIsCreator(account === CONTRACT_CREATOR_ADDRESS);
      }
    };
    checkConnectedAccount();
  }, []);

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
          connectedAccount={connectedAccount} // Pass connectedAccount
          isCreator={isCreator} // Pass isCreator
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
