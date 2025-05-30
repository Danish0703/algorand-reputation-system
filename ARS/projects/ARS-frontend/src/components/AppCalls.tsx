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
  const [bootstrapNftId, setBootstrapNftId] = useState<string>(''); // New state
  const [bootstrapThreshold, setBootstrapThreshold] = useState<string>(''); // New state

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
                <button className="button action-button">Bootstrap</button>
              </div>

              <div className="action-card">
                <h4>Set Reputation Score</h4>
                <input
                  type="text"
                  placeholder="Target Address"
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="New Score"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                />
                <button className="button action-button">Set Score</button>
              </div>
            </div>
          )}
          {/* User actions will go here */}
        </>
      ) : (
        <p>Please connect your wallet to interact with the contract.</p>
      )}
    </div>
  );
};

export default AppCalls;
