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
  const [reputationScore, setReputationScore] = useState<number | null>(null);
  const [nftId, setNftId] = useState<number | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [targetAddress, setTargetAddress] = useState<string>('');
  const [newScore, setNewScore] = useState<string>('');
  const [bootstrapNftId, setBootstrapNftId] = useState<string>('');
  const [bootstrapThreshold, setBootstrapThreshold] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [hasNft, setHasNft] = useState<boolean | null>(null);
  const [isReputableStatus, setIsReputableStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchContractData = async () => {
      if (connectedAccount) {
        try {
          const score = await getReputationScore(connectedAccount, connectedAccount);
          setReputationScore(score);

          const nft = await getGlobalStateValue("soulbound_nft_id");
          setNftId(nft);

          const thres = await getGlobalStateValue("reputation_threshold");
          setThreshold(thres);

          if (nft && connectedAccount) {
            // Check if user has NFT (placeholder, actual implementation will be more complex)
            // For now, let's assume `has_nft` is a contract method that returns a boolean
            // Or, more accurately, we'd need to query the asset balance.
            // setHasNft(await callAppMethod("has_nft", [connectedAccount], connectedAccount)); // This would return a txId, not a boolean directly.
            setHasNft(false); // Placeholder for now, proper logic needed.
          }

          if (score !== null && threshold !== null) {
            setIsReputableStatus(score >= threshold);
          }

        } catch (error) {
          console.error("Error fetching contract data:", error);
          setStatusMessage("Error fetching contract data.");
        }
      }
    };
    fetchContractData();
  }, [connectedAccount]); // Rerun when connectedAccount changes

  return (
    <div className="app-calls-container">
      {/* ... rest of the component ... */}
    </div>
  );
};

export default AppCalls;
