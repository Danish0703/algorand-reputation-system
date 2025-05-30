// src/components/AppCalls.tsx
import React, { useState, useEffect } from 'react';
import {
  REPUTATION_APP_ID,
  getReputationScore,
  getGlobalStateValue,
  callAppMethod,
} from '../utils/algorand';

interface AppCallsProps {
  connectedAccount: string | null;
  isCreator: boolean;
  creatorAddress: string;
}

const AppCalls: React.FC<AppCallsProps> = ({ connectedAccount, isCreator, creatorAddress }) => {
  // ... existing states and other action handlers ...

  const handleRevokeNft = async () => {
    if (!connectedAccount || !isCreator) {
      setStatusMessage("Only the contract creator can revoke NFTs.");
      return;
    }
    if (!targetAddress) { // Using same targetAddress state for simplicity
      setStatusMessage("Please enter target address to revoke NFT from.");
      return;
    }
    setStatusMessage("Revoking NFT...");
    try {
      const txResponse = await callAppMethod("revoke_nft", [targetAddress], connectedAccount);
      setStatusMessage(`NFT revoked! Transaction ID: ${txResponse.txId}`);
      // Refresh has_nft status if it was for the current user
      if (targetAddress === connectedAccount) {
        setHasNft(false); // Assuming success
      }
    } catch (error) {
      console.error("Error revoking NFT:", error);
      setStatusMessage(`Error revoking NFT: ${(error as Error).message}`);
    }
  };

  return (
    <div className="app-calls-container">
      {/* ... existing UI ... */}
      {isCreator && (
        <div className="creator-actions">
          {/* ... bootstrap and set score cards ... */}
          <div className="action-card">
            <h4>Revoke Soulbound NFT</h4>
            <input
              type="text"
              placeholder="Target Address to Revoke"
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
            />
            <button onClick={handleRevokeNft} className="button action-button">Revoke NFT</button>
          </div>
        </div>
      )}
      {/* ... user actions and status message ... */}
    </div>
  );
};

export default AppCalls;
