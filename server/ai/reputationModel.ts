/**
 * This file contains a simplified ML model for analyzing Algorand transactions
 * and calculating reputation scores. In a production environment, this would use
 * a more sophisticated model trained on blockchain data.
 */

import { AlgorandTransaction, getWalletTransactions } from '../algorand';

interface TransactionMetrics {
  totalTransactions: number;
  transactionFrequency: number; // transactions per month
  averageTransactionSize: number;
  transactionDiversity: number; // unique transaction types
  longevityMonths: number;
  defiInteractions: number;
  nftTransactions: number;
  daoVotes: number;
}

interface ReputationFactors {
  transactionHistoryScore: number;
  defiParticipationScore: number;
  daoGovernanceScore: number;
  nftActivityScore: number;
}

export interface ReputationAnalysis {
  totalScore: number;
  factors: ReputationFactors;
  metrics: TransactionMetrics;
}

// These weights determine how much each factor impacts the total score
const FACTOR_WEIGHTS = {
  transactionHistory: 0.35,
  defiParticipation: 0.25,
  daoGovernance: 0.2,
  nftActivity: 0.2
};

// Categories of transactions
const TRANSACTION_CATEGORIES = {
  defi: ['swap', 'liquidity', 'yield', 'staking', 'lending', 'borrowing', 'provision'],
  nft: ['nft', 'collectible', 'art', 'purchase', 'mint'],
  dao: ['vote', 'proposal', 'governance', 'dao']
};

// Analyze a single transaction and categorize it
function categorizeTransaction(tx: AlgorandTransaction): string[] {
  const categories: string[] = [];
  const txTypeLC = tx.type.toLowerCase();
  
  if (TRANSACTION_CATEGORIES.defi.some(term => txTypeLC.includes(term))) {
    categories.push('defi');
  }
  
  if (TRANSACTION_CATEGORIES.nft.some(term => txTypeLC.includes(term))) {
    categories.push('nft');
  }
  
  if (TRANSACTION_CATEGORIES.dao.some(term => txTypeLC.includes(term))) {
    categories.push('dao');
  }
  
  if (categories.length === 0) {
    categories.push('general');
  }
  
  return categories;
}

// Calculate metrics from transaction history
function calculateMetrics(transactions: AlgorandTransaction[]): TransactionMetrics {
  if (!transactions.length) {
    return {
      totalTransactions: 0,
      transactionFrequency: 0,
      averageTransactionSize: 0,
      transactionDiversity: 0,
      longevityMonths: 0,
      defiInteractions: 0,
      nftTransactions: 0,
      daoVotes: 0
    };
  }
  
  // Calculate oldest transaction timestamp
  const oldestTx = transactions.reduce((oldest, tx) => 
    tx.timestamp < oldest.timestamp ? tx : oldest, 
    transactions[0]
  );
  
  const currentTime = Date.now();
  const accountAgeMs = currentTime - oldestTx.timestamp;
  const longevityMonths = Math.max(1, Math.floor(accountAgeMs / (30 * 24 * 60 * 60 * 1000)));
  
  // Calculate average transaction size
  const totalAmount = transactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const averageTransactionSize = totalAmount / transactions.length;
  
  // Calculate transaction frequency (per month)
  const transactionFrequency = transactions.length / longevityMonths;
  
  // Calculate diversity (unique transaction types)
  const uniqueTypes = new Set(transactions.map(tx => tx.type)).size;
  const transactionDiversity = uniqueTypes;
  
  // Count DeFi, NFT, and DAO interactions
  let defiInteractions = 0;
  let nftTransactions = 0;
  let daoVotes = 0;
  
  transactions.forEach(tx => {
    const categories = categorizeTransaction(tx);
    if (categories.includes('defi')) defiInteractions++;
    if (categories.includes('nft')) nftTransactions++;
    if (categories.includes('dao')) daoVotes++;
  });
  
  return {
    totalTransactions: transactions.length,
    transactionFrequency,
    averageTransactionSize,
    transactionDiversity,
    longevityMonths,
    defiInteractions,
    nftTransactions,
    daoVotes
  };
}

// Calculate reputation factors based on metrics
function calculateFactors(metrics: TransactionMetrics): ReputationFactors {
  // Calculate transaction history score (max 100)
  const txHistoryBase = Math.min(metrics.totalTransactions / 2, 80);
  const txHistoryFreq = Math.min(metrics.transactionFrequency * 5, 20);
  const transactionHistoryScore = Math.floor(txHistoryBase + txHistoryFreq);
  
  // Calculate DeFi participation score (max 100)
  const defiBase = Math.min(metrics.defiInteractions * 5, 80);
  const defiBonus = metrics.defiInteractions > 10 ? 20 : metrics.defiInteractions * 2;
  const defiParticipationScore = Math.floor(defiBase + defiBonus);
  
  // Calculate DAO governance score (max 100)
  const daoBase = Math.min(metrics.daoVotes * 10, 90);
  const daoBonus = metrics.daoVotes > 5 ? 10 : metrics.daoVotes * 2;
  const daoGovernanceScore = Math.floor(daoBase + daoBonus);
  
  // Calculate NFT activity score (max 100)
  const nftBase = Math.min(metrics.nftTransactions * 8, 80);
  const nftBonus = metrics.nftTransactions > 5 ? 20 : metrics.nftTransactions * 4;
  const nftActivityScore = Math.floor(nftBase + nftBonus);
  
  return {
    transactionHistoryScore,
    defiParticipationScore,
    daoGovernanceScore,
    nftActivityScore
  };
}

// Calculate total reputation score based on factors and weights
function calculateTotalScore(factors: ReputationFactors): number {
  const weightedScore = 
    factors.transactionHistoryScore * FACTOR_WEIGHTS.transactionHistory +
    factors.defiParticipationScore * FACTOR_WEIGHTS.defiParticipation +
    factors.daoGovernanceScore * FACTOR_WEIGHTS.daoGovernance +
    factors.nftActivityScore * FACTOR_WEIGHTS.nftActivity;
  
  // Apply longevity bonus (the longer the account has been active, the more trusted it is)
  return Math.floor(weightedScore);
}

// Main function to analyze wallet and calculate reputation
export async function analyzeWalletReputation(walletAddress: string): Promise<ReputationAnalysis> {
  // Get wallet transactions
  const transactions = await getWalletTransactions(walletAddress);
  
  // Calculate metrics
  const metrics = calculateMetrics(transactions);
  
  // Calculate factors
  const factors = calculateFactors(metrics);
  
  // Calculate total score
  const totalScore = calculateTotalScore(factors);
  
  return {
    totalScore,
    factors,
    metrics
  };
}
