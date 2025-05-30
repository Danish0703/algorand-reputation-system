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
            setHasNft(false); // Placeholder
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

    // Refresh data periodically or after transactions
    const interval = setInterval(fetchContractData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount or dependency change

  }, [connectedAccount, nftId, threshold]); // Dependencies for useEffect

  return (
    <div className="app-calls-container">
      {/* ... rest of the component ... */}
    </div>
  );
};

export default AppCalls;
