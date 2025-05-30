// src/components/AppCalls.tsx
import React, { useState } from 'react'; // Import useState
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
  const [reputationScore, setReputationScore] = useState<number | null>(null); // New state

  return (
    <div className="app-calls-container">
      <h2>Contract Interactions</h2>
      {connectedAccount ? (
        <>
          <p>Connected Account: {connectedAccount.substring(0, 8)}...</p>
          <div className="contract-info">
            <h3>Contract State</h3>
            <p>Your Reputation Score: {reputationScore !== null ? reputationScore : 'Loading...'}</p>
          </div>
          {/* Interaction UIs will go here */}
        </>
      ) : (
        <p>Please connect your wallet to interact with the contract.</p>
      )}
    </div>
  );
};

export default AppCalls;
