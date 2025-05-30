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
  // ... existing states ...

  const handleBootstrap = async () => {
    if (!connectedAccount || !isCreator) {
      setStatusMessage("Only the contract creator can bootstrap.");
      return;
    }
    if (!bootstrapNftId || !bootstrapThreshold) {
      setStatusMessage("Please enter NFT ID and Threshold to bootstrap.");
      return;
    }

    setStatusMessage("Bootstrapping contract...");
    try {
      const txResponse = await callAppMethod("bootstrap", [parseInt(bootstrapNftId), parseInt(bootstrapThreshold)], connectedAccount);
      setStatusMessage(`Contract bootstrapped! Transaction ID: ${txResponse.txId}`);
      // Refresh global state values after bootstrap
      const nft = await getGlobalStateValue("soulbound_nft_id");
      setNftId(nft);
      const thres = await getGlobalStateValue("reputation_threshold");
      setThreshold(thres);

    } catch (error) {
      console.error("Error bootstrapping:", error);
      setStatusMessage(`Error bootstrapping: ${(error as Error).message}`);
    }
  };

  return (
    <div className="app-calls-container">
      {/* ... existing UI ... */}
      {isCreator && (
        <div className="creator-actions">
          <h3>Creator Actions</h3>
          <div className="action-card">
            <h4>Bootstrap Contract</h4>
            <input
              type="number"
              placeholder="NFT ID (e.g., 123456)"
              value={bootstrapNftId}
              onChange={(e) => setBootstrapNftId(e.target.value)}
            />
            <input
              type="number"
              placeholder="Reputation Threshold (e.g., 80)"
              value={bootstrapThreshold}
              onChange={(e) => setBootstrapThreshold(e.target.value)}
            />
            <button onClick={handleBootstrap} className="button action-button">Bootstrap</button>
          </div>
          {/* ... other creator actions ... */}
        </div>
      )}
      {/* ... rest of the component ... */}
    </div>
  );
};

export default AppCalls;
