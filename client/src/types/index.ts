// Type definitions for the application

// Algorand wallet types
export interface AlgorandWallet {
  address: string;
  balance: number;
  connecting: boolean;
  connected: boolean;
}

// AI Analysis types
export interface AIAnalysisResult {
  totalScore: number;
  factors: {
    transactionHistoryScore: number;
    defiParticipationScore: number;
    daoGovernanceScore: number;
    nftActivityScore: number;
  };
  metrics: {
    totalTransactions: number;
    transactionFrequency: number;
    averageTransactionSize: number;
    transactionDiversity: number;
    longevityMonths: number;
    defiInteractions: number;
    nftTransactions: number;
    daoVotes: number;
  };
}

// Reputation benefit types
export interface ReputationBenefit {
  name: string;
  description: string;
  requiredScore: number;
  unlocked: boolean;
}

// Soulbound NFT level types
export enum NFTLevel {
  BASIC = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
  EXPERT = 4,
  MASTER = 5
}

// Transaction filter types
export type TransactionFilter = 'all' | 'defi' | 'nft' | 'dao';

// Transaction type categories
export const TRANSACTION_CATEGORIES = {
  defi: ['swap', 'liquidity', 'yield', 'staking', 'lending', 'borrowing', 'provision'],
  nft: ['nft', 'collectible', 'art', 'purchase', 'mint'],
  dao: ['vote', 'proposal', 'governance', 'dao']
};

// Color themes based on transaction types
export const TRANSACTION_COLORS = {
  defi: 'text-[#00BF63] bg-[#00BF63] bg-opacity-10',
  nft: 'text-yellow-500 bg-yellow-500 bg-opacity-10',
  dao: 'text-blue-500 bg-blue-500 bg-opacity-10',
  default: 'text-purple-500 bg-purple-500 bg-opacity-10'
};
