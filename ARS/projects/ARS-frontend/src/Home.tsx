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
    // Listening for Pera Wallet events would ideally go here.
  }, []); // Run once on mount

  return (
    <div className="container">
      {/* ... rest of the component ... */}
    </div>
  );
};

export default Home;
