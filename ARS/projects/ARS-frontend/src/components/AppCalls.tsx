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
  // ... existing states and creator action handlers ...

  const handleMintNft = async () => {
    if (!connectedAccount) {
      setStatusMessage("Please connect your wallet.");
      return;
    }
    setStatusMessage("Attempting to mint NFT...");
    try {
      // In a real dApp, user needs to opt-in to the NFT asset before minting.
      // This example assumes opt-in is handled or not required for contract.
      const txResponse = await callAppMethod("mint_nft", [], connectedAccount); // No args needed for mint_nft
      setStatusMessage(`NFT minted! Transaction ID: ${txResponse.txId}`);
      // Refresh has_nft status
      setHasNft(true); // Assuming success
    } catch (error) {
      console.error("Error minting NFT:", error);
      setStatusMessage(`Error minting NFT: ${(error as Error).message}`);
    }
  };

  return (
    <div className="app-calls-container">
      {/* ... existing UI and creator actions ... */}
      {connectedAccount ? (
        <>
          {/* ... contract info and creator actions ... */}
          <div className="user-actions">
            <h3>User Actions</h3>
            <button
              onClick={handleMintNft}
              // Disabled logic will be refined later
              className="button action-button"
            >
              Mint Soulbound NFT
            </button>
          </div>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </>
      ) : (
        <p>Please connect your wallet to interact with the contract.</p>
      )}
    </div>
  );
};

export default AppCalls;
