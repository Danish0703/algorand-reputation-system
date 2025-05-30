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

  const handleBootstrap = async () => { /* ... */ };

  const handleSetScore = async () => {
    if (!connectedAccount || !isCreator) {
      setStatusMessage("Only the contract creator can set scores.");
      return;
    }
    if (!targetAddress || !newScore) {
      setStatusMessage("Please enter target address and new score.");
      return;
    }
    setStatusMessage("Setting score...");
    try {
      const txResponse = await callAppMethod("set_score", [targetAddress, parseInt(newScore)], connectedAccount);
      setStatusMessage(`Score set! Transaction ID: ${txResponse.txId}`);
      // Refresh score if it was for the current user
      if (targetAddress === connectedAccount) {
        const score = await getReputationScore(connectedAccount, connectedAccount);
        setReputationScore(score);
      }
    } catch (error) {
      console.error("Error setting score:", error);
      setStatusMessage(`Error setting score: ${(error as Error).message}`);
    }
  };

  return (
    <div className="app-calls-container">
      {/* ... existing UI ... */}
      {isCreator && (
        <div className="creator-actions">
          {/* ... bootstrap card ... */}
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
            <button onClick={handleSetScore} className="button action-button">Set Score</button>
          </div>
        </div>
      )}
      {/* ... rest of the component ... */}
    </div>
  );
};

export default AppCalls;
