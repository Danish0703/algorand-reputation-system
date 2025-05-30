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
  const [reputationScore, setReputationScore] = useState<number | null>(null);
  const [hasNft, setHasNft] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [targetAddress, setTargetAddress] = useState<string>(''); // For Bootstrap, Set Score, Revoke NFT
  const [scoreValue, setScoreValue] = useState<number>(0); // For setting reputation score

   // --- Effects ---
  useEffect(() => {
    const fetchAccountData = async () => {
      if (connectedAccount) {
        setStatusMessage('Fetching account data...');
        try {
          // Fetch reputation score
          const score = await getReputationScore(connectedAccount);
          setReputationScore(score);

          // Check for NFT presence (assuming a global state or method for this)
          // This will depend on your contract logic. Example: checking a local state or an opt-in
          // For simplicity, let's assume getGlobalStateValue can fetch a user's NFT status if designed this way.
          // A more robust check might involve looking at asset holdings.
          const nftStatus = await getGlobalStateValue(REPUTATION_APP_ID, `nft_holder_${connectedAccount}`);
          setHasNft(nftStatus === 1); // Assuming 1 means true, 0 means false

          setStatusMessage('');
        } catch (error) {
          console.error("Error fetching account data:", error);
          setStatusMessage(`Error fetching data: ${(error as Error).message}`);
        }
      } else {
        setReputationScore(null);
        setHasNft(false);
        setStatusMessage("Please connect your wallet.");
      }
    };

    fetchAccountData();
    // Re-fetch when connectedAccount changes
  }, [connectedAccount]);

    // --- Action Handlers ---

  const handleBootstrapApp = async () => {
    if (!connectedAccount || !isCreator) {
      setStatusMessage("Only the contract creator can bootstrap the application.");
      return;
    }
    setStatusMessage("Bootstrapping application...");
    try {
      const txResponse = await callAppMethod("bootstrap", [], connectedAccount);
      setStatusMessage(`Application bootstrapped! Transaction ID: ${txResponse.txId}`);
      // You might want to refresh global state here or indicate success
    } catch (error) {
      console.error("Error bootstrapping app:", error);
      setStatusMessage(`Error bootstrapping app: ${(error as Error).message}`);
    }
  };

  const handleSetReputationScore = async () => {
    if (!connectedAccount || !isCreator) {
      setStatusMessage("Only the contract creator can set reputation scores.");
      return;
    }
    if (!targetAddress || scoreValue === null) {
      setStatusMessage("Please enter a target address and a score value.");
      return;
    }
    setStatusMessage(`Setting reputation score for ${targetAddress} to ${scoreValue}...`);
    try {
      const txResponse = await callAppMethod("set_reputation_score", [targetAddress, scoreValue], connectedAccount);
      setStatusMessage(`Score set! Transaction ID: ${txResponse.txId}`);
      // If setting for current user, refresh their score
      if (targetAddress === connectedAccount) {
        setReputationScore(scoreValue);
      }
    } catch (error) {
      console.error("Error setting reputation score:", error);
      setStatusMessage(`Error setting score: ${(error as Error).message}`);
    }
  };

  const handleIssueNft = async () => {
    if (!connectedAccount || !isCreator) {
      setStatusMessage("Only the contract creator can issue NFTs.");
      return;
    }
    if (!targetAddress) {
      setStatusMessage("Please enter target address to issue NFT to.");
      return;
    }
    setStatusMessage("Issuing NFT...");
    try {
      const txResponse = await callAppMethod("issue_nft", [targetAddress], connectedAccount);
      setStatusMessage(`NFT issued! Transaction ID: ${txResponse.txId}`);
      // Refresh has_nft status if it was for the current user
      if (targetAddress === connectedAccount) {
        setHasNft(true); // Assuming success
      }
    } catch (error) {
      console.error("Error issuing NFT:", error);
      setStatusMessage(`Error issuing NFT: ${(error as Error).message}`);
    }
  };

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
      <h2>Contract Interactions</h2>
      {connectedAccount ? (
        <>
          <p>Connected Account: {connectedAccount.substring(0, 8)}...{connectedAccount.slice(-4)}</p>
          <p>Your Reputation Score: {reputationScore !== null ? reputationScore : 'Loading...'}</p>
          <p>Has Soulbound NFT: {hasNft ? 'Yes' : 'No'}</p>

          {isCreator && (
            <div className="creator-actions">
              <h3>Creator Actions</h3>
              <p>Creator Address: {creatorAddress}</p>

              <div className="action-card">
                <h4>Bootstrap Application</h4>
                <p>Initialize the application's global state.</p>
                <button onClick={handleBootstrapApp} className="button action-button">Bootstrap App</button>
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
                  placeholder="Score Value"
                  value={scoreValue}
                  onChange={(e) => setScoreValue(parseInt(e.target.value))}
                />
                <button onClick={handleSetReputationScore} className="button action-button">Set Score</button>
              </div>

              <div className="action-card">
                <h4>Issue Soulbound NFT</h4>
                <input
                  type="text"
                  placeholder="Target Address to Issue"
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                />
                <button onClick={handleIssueNft} className="button action-button">Issue NFT</button>
              </div>

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

          {/* User-specific actions (e.g., opting into app, burning their own NFT, etc.) could go here */}
          {!isCreator && (
            <div className="user-actions">
              <h3>User Information</h3>
              {/* You might add actions for regular users here, e.g., viewing app state, opting into the app, etc. */}
              <p>You are connected as a regular user.</p>
            </div>
          )}

          {statusMessage && <p className="status-message">{statusMessage}</p>}

        </>
      ) : (
        <p>Please connect your wallet to interact with the contract.</p>
      )}
    </div>
  );
};

export default AppCalls;
