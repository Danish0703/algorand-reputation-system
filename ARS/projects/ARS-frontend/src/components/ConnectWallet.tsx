// src/components/ConnectWallet.tsx
import React from 'react';

interface ConnectWalletProps {
  onConnect: (accounts: string[]) => void;
  onDisconnect: () => void;
  connectedAccount: string | null;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect, onDisconnect, connectedAccount }) => {
  // Connection/disconnection logic will go here
  return (
    <div className="connect-wallet-container">
      {connectedAccount ? (
        <div>
          <p>Connected: {connectedAccount}</p>
          <button className="button disconnect-button">Disconnect Wallet</button>
        </div>
      ) : (
        <button className="button connect-button">Connect Pera Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
