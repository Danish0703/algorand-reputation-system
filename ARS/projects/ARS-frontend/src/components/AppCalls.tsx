// src/components/AppCalls.tsx (New File)
import React from 'react';

interface AppCallsProps {
  connectedAccount: string | null;
  isCreator: boolean;
  creatorAddress: string;
}

const AppCalls: React.FC<AppCallsProps> = ({ connectedAccount, isCreator, creatorAddress }) => {
  return (
    <div className="app-calls-container">
      <h2>Contract Interactions</h2>
      {connectedAccount ? (
        <>
          <p>Connected Account: {connectedAccount.substring(0, 8)}...</p>
          {/* Interaction UIs will go here */}
        </>
      ) : (
        <p>Please connect your wallet to interact with the contract.</p>
      )}
    </div>
  );
};

export default AppCalls;
