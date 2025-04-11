import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReputationScore, ReputationFactor, SoulboundNft, Transaction } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function useReputation(walletAddress: string) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  
  // Get reputation score
  const { 
    data: reputation,
    isLoading: isReputationLoading,
    error: reputationError 
  } = useQuery<ReputationScore>({
    queryKey: [`/api/reputation/${walletAddress}`],
    enabled: !!walletAddress,
  });
  
  // Get reputation factors
  const {
    data: factors,
    isLoading: isFactorsLoading,
    error: factorsError
  } = useQuery<ReputationFactor[]>({
    queryKey: [`/api/reputation/${walletAddress}/factors`],
    enabled: !!walletAddress,
  });
  
  // Get soulbound NFTs
  const {
    data: nfts,
    isLoading: isNftsLoading,
    error: nftsError
  } = useQuery<SoulboundNft[]>({
    queryKey: [`/api/nfts/${walletAddress}`],
    enabled: !!walletAddress,
  });
  
  // Get transactions
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError
  } = useQuery<Transaction[]>({
    queryKey: [`/api/transactions/${walletAddress}`],
    enabled: !!walletAddress,
  });
  
  // AI Analysis mutation
  const {
    mutate: runAiAnalysis,
    isPending: isAnalyzing
  } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/analyze/${walletAddress}`, {});
      return response.json();
    },
    onSuccess: () => {
      // Invalidate all relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: [`/api/reputation/${walletAddress}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/reputation/${walletAddress}/factors`] });
      queryClient.invalidateQueries({ queryKey: [`/api/transactions/${walletAddress}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/nfts/${walletAddress}`] });
    }
  });
  
  // Advanced AI Analysis mutation
  const {
    mutate: runAdvancedAiAnalysis,
    isPending: isAdvancedAnalyzing
  } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/analyze-advanced/${walletAddress}`, {});
      return response.json();
    },
    onSuccess: () => {
      // Invalidate all relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: [`/api/reputation/${walletAddress}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/reputation/${walletAddress}/factors`] });
      queryClient.invalidateQueries({ queryKey: [`/api/transactions/${walletAddress}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/nfts/${walletAddress}`] });
    }
  });
  
  // Record new transaction mutation
  const {
    mutate: recordTransaction,
    isPending: isRecordingTransaction
  } = useMutation({
    mutationFn: async (transactionData: {
      txId: string;
      type: string;
      amount: string;
      aiAnalyzed?: boolean;
    }) => {
      const response = await apiRequest(
        "POST", 
        `/api/transactions/${walletAddress}`, 
        transactionData
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/transactions/${walletAddress}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/reputation/${walletAddress}`] });
    }
  });
  
  // Create Soulbound NFT mutation
  const {
    mutate: createSoulboundNft,
    isPending: isCreatingNft
  } = useMutation({
    mutationFn: async (nftData: {
      name: string;
      description: string;
      imageUrl: string;
      level: number;
    }) => {
      const response = await apiRequest(
        "POST", 
        `/api/nfts/${walletAddress}`, 
        nftData
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/nfts/${walletAddress}`] });
    }
  });
  
  // Filter transactions based on selected filter
  const filteredTransactions = transactions ? transactions.filter(tx => {
    if (filter === "all") return true;
    
    const txType = tx.type.toLowerCase();
    if (filter === "defi") return txType.includes("liquidity") || 
                             txType.includes("swap") ||
                             txType.includes("yield");
    if (filter === "nft") return txType.includes("nft") || 
                            txType.includes("collect");
    if (filter === "dao") return txType.includes("dao") || 
                            txType.includes("vote") ||
                            txType.includes("govern");
    return true;
  }) : [];
  
  const isLoading = isReputationLoading || isFactorsLoading || isNftsLoading || isTransactionsLoading;
  const isFetching = isAnalyzing || isAdvancedAnalyzing || isRecordingTransaction || isCreatingNft;
  
  const error = reputationError || factorsError || nftsError || transactionsError;
  
  return {
    reputation,
    factors: factors || [],
    nfts: nfts || [],
    transactions: transactions || [],
    filteredTransactions,
    filter,
    setFilter,
    isLoading,
    isFetching,
    error,
    runAiAnalysis,
    runAdvancedAiAnalysis,
    isAdvancedAnalyzing,
    recordTransaction,
    createSoulboundNft
  };
}
