// src/components/AppCalls.tsx
import React, { useState, useEffect } from 'react'; // Import useEffect
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
    const fetchGlobalState = async () => {
      try {
        const nft = await getGlobalStateValue("soulbound_nft_id");
        setNftId(nft);

        const thres = await getGlobalStateValue("reputation_threshold");
        setThreshold(thres);
      } catch (error) {
        console.error("Error fetching global state:", error);
        setStatusMessage("Error fetching contract global state.");
      }
    };
    fetchGlobalState();
  }, []); // Run once on mount

  return (
    <div className="app-calls-container">
      {/* ... rest of the component ... */}
    </div>
  );
};

export default AppCalls;
