// src/Home.tsx (New File)
import React, { useState, useEffect } from 'react'; // Will add useEffect later
import ConnectWallet from './components/ConnectWallet';
import Account from './components/Account';
import AppCalls from './components/AppCalls';
import { getAccountAddress } from './utils/algorand'; // Will add this import later

// Replace with the actual creator address from your smart contract deployment
const CONTRACT_CREATOR_ADDRESS = "YOUR_CONTRACT_CREATOR_ADDRESS_HERE"; // IMPORTANT: Update this!

const Home: React.FC = () => {
  // States will be managed here

  return (
    <div className="container">
      <header className="header">
        <h1>Reputation System dApp</h1>
        {/* ConnectWallet will go here */}
      </header>

      <main className="main-content">
        {/* Account and AppCalls will go here */}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Reputation System dApp</p>
      </footer>
    </div>
  );
};

export default Home;
