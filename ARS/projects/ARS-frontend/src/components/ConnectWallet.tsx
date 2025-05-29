// src/components/ConnectWallet.tsx
import React from 'react';
import { connectToPera, disconnectFromPera } from '../utils/algorand';

interface ConnectWalletProps {
  onConnect: (accounts: string[]) => void;
  onDisconnect: () => void;
  connectedAccount: string | null;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect, onDisconnect, connectedAccount }) => {
  const handleConnect = async () => {
    try {
      const accounts = await connectToPera();
      onConnect(accounts);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      alert("Failed to connect to wallet. Please ensure Pera Wallet is installed and open.");
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectFromPera();
      onDisconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <div className="connect-wallet-container">
      {connectedAccount ? (
        <div>
          <p>Connected: {connectedAccount.substring(0, 8)}...{connectedAccount.slice(-4)}</p>
          <button onClick={handleDisconnect} className="button disconnect-button">Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={handleConnect} className="button connect-button">Connect Pera Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
