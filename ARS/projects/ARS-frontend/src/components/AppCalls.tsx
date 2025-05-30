// src/components/AppCalls.tsx
import React, { useState } from 'react';
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
  const [reputationScore, setReputationScore] = useState<number | null>(null);
  const [nftId, setNftId] = useState<number | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [targetAddress, setTargetAddress] = useState<string>('');
  const [newScore, setNewScore] = useState<string>('');
  const [bootstrapNftId, setBootstrapNftId] = useState<string>('');
  const [bootstrapThreshold, setBootstrapThreshold] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>(''); // New state

  return (
    <div className="app-calls-container">
      <h2>Contract Interactions</h2>
      {connectedAccount ? (
        <>
          <p>Connected Account: {connectedAccount.substring(0, 8)}...</p>
          <div className="contract-info">
            <h3>Contract State</h3>
            <p>Soulbound NFT ID: {nftId !== null ? nftId : 'N/A'}</p>
            <p>Reputation Threshold: {threshold !== null ? threshold : 'N/A'}</p>
            <p>Your Reputation Score: {reputationScore !== null ? reputationScore : 'Loading...'}</p>
          </div>
          {isCreator && (
            <div className="creator-actions">
              {/* ... creator actions ... */}
            </div>
          )}
          {/* User actions will go here */}
          {statusMessage && <p className="status-message">{statusMessage}</p>} {/* Display status message */}
        </>
      ) : (
        <p>Please connect your wallet to interact with the contract.</p>
      )}
    </div>
  );
};

export default AppCalls;
