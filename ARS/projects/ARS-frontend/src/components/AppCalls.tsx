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
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [hasNft, setHasNft] = useState<boolean | null>(null);
  const [isReputableStatus, setIsReputableStatus] = useState<boolean | null>(null); // New state

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
            <p>Do you have the NFT? {hasNft !== null ? (hasNft ? 'Yes' : 'No') : 'Loading...'}</p>
            <p>Are you reputable? {isReputableStatus !== null ? (isReputableStatus ? 'Yes' : 'No') : 'Loading...'}</p> {/* Display reputable status */}
          </div>
          {/* ... */}
        </>
      ) : (
        <p>Please connect your wallet to interact with the contract.</p>
      )}
    </div>
  );
};

export default AppCalls;
