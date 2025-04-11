/**
 * Advanced AI Reputation Model for Algorand transactions
 * 
 * This model implements sophisticated analysis techniques to evaluate wallet behavior
 * and provides a detailed breakdown of reputation factors.
 */

import { AlgorandTransaction, getWalletTransactions } from '../algorand';

// Extended metrics for more detailed analysis
interface AdvancedTransactionMetrics {
  // Core metrics
  totalTransactions: number;
  transactionFrequency: number; // transactions per month
  averageTransactionSize: number;
  transactionDiversity: number; // unique transaction types
  longevityMonths: number;
  
  // Activity breakdown
  defiInteractions: number;
  nftTransactions: number;
  daoVotes: number;
  
  // Advanced metrics
  consistencyScore: number;       // How regular transaction activity is
  interactionDiversity: number;   // Different addresses interacted with
  riskScore: number;              // Risk assessment based on transaction patterns
  valueDistribution: number;      // Distribution of value across transaction sizes
  transactionGrowthRate: number;  // Growth rate of transaction activity over time
  regularity: number;             // How regularly the wallet performs transactions
  networkCentrality: number;      // How central the wallet is in the transaction network
  temporalPatterns: number;       // Score for temporal transaction patterns
}

// Extended factors for more nuanced scoring
interface AdvancedReputationFactors {
  // Core factors
  transactionHistoryScore: number;
  defiParticipationScore: number;
  daoGovernanceScore: number;
  nftActivityScore: number;
  
  // Advanced factors
  consistencyFactor: number;        // Rewards consistent long-term activity
  diversityFactor: number;          // Rewards diverse transaction types
  growthFactor: number;             // Rewards increasing interaction over time
  riskAssessmentFactor: number;     // Evaluates risk patterns in transactions
  valueDistributionFactor: number;  // Evaluates distribution of transaction values
  networkPositionFactor: number;    // Evaluates position in the transaction network
  temporalBehaviorFactor: number;   // Evaluates patterns in timing of transactions
}

// Enhanced analysis result with detailed breakdown
export interface AdvancedReputationAnalysis {
  totalScore: number;
  confidenceScore: number;        // Confidence level in the analysis
  factorBreakdown: {
    [key: string]: number;        // Individual contribution of each factor
  };
  factors: AdvancedReputationFactors;
  metrics: AdvancedTransactionMetrics;
  insights: string[];             // Key insights about the wallet behavior
  anomalies: string[];            // Potential anomalies detected
  recommendations: string[];      // Recommendations for improving reputation
  predictedGrowth: number;        // Predicted reputation growth in next 3 months
}

// Weight configuration for each factor
const FACTOR_WEIGHTS = {
  // Core weights
  transactionHistory: 0.20,
  defiParticipation: 0.15,
  daoGovernance: 0.15,
  nftActivity: 0.10,
  
  // Advanced weights
  consistency: 0.10,
  diversity: 0.05,
  growth: 0.05,
  riskAssessment: 0.08,
  valueDistribution: 0.05,
  networkPosition: 0.05,
  temporalBehavior: 0.02,
};

// Transaction categories for categorization
const TRANSACTION_CATEGORIES = {
  defi: ['swap', 'liquidity', 'yield', 'staking', 'lending', 'borrowing', 'provision', 'farm', 'pool', 'claim', 'reward', 'interest', 'apy', 'apr'],
  nft: ['nft', 'collectible', 'art', 'purchase', 'mint', 'token', 'auction', 'royalty', 'creator', 'artwork', 'unique', 'collection'],
  dao: ['vote', 'proposal', 'governance', 'dao', 'delegate', 'election', 'ballot', 'community', 'decision', 'forum', 'member', 'quorum'],
  security: ['multisig', 'secure', 'cold storage', 'vault', 'escrow', 'time-lock', 'backup', 'recover', 'hardware', 'threshold']
};

// Pattern recognition for transaction behaviors
const TRANSACTION_PATTERNS = {
  suspicious: ['multiple_small_transfers', 'erratic_timing', 'high_velocity_transfers'],
  positive: ['regular_staking', 'consistent_participation', 'diverse_ecosystem_engagement']
};

// Enhanced categorization with confidence levels
interface CategoryResult {
  category: string;
  confidence: number;
}

/**
 * Enhanced transaction categorization with confidence levels
 */
function advancedCategorizeTransaction(tx: AlgorandTransaction): CategoryResult[] {
  const results: CategoryResult[] = [];
  const txTypeLC = tx.type.toLowerCase();
  const txNote = tx.note ? tx.note.toLowerCase() : '';
  
  // Helper function to calculate confidence based on matches
  const calculateConfidence = (matches: number, terms: string[]): number => {
    return Math.min(0.3 + (matches / terms.length) * 0.7, 1.0);
  };
  
  // Check for DeFi transactions
  const defiMatches = TRANSACTION_CATEGORIES.defi.filter(term => 
    txTypeLC.includes(term) || txNote.includes(term)
  ).length;
  
  if (defiMatches > 0) {
    results.push({
      category: 'defi',
      confidence: calculateConfidence(defiMatches, TRANSACTION_CATEGORIES.defi)
    });
  }
  
  // Check for NFT transactions
  const nftMatches = TRANSACTION_CATEGORIES.nft.filter(term => 
    txTypeLC.includes(term) || txNote.includes(term)
  ).length;
  
  if (nftMatches > 0) {
    results.push({
      category: 'nft',
      confidence: calculateConfidence(nftMatches, TRANSACTION_CATEGORIES.nft)
    });
  }
  
  // Check for DAO transactions
  const daoMatches = TRANSACTION_CATEGORIES.dao.filter(term => 
    txTypeLC.includes(term) || txNote.includes(term)
  ).length;
  
  if (daoMatches > 0) {
    results.push({
      category: 'dao',
      confidence: calculateConfidence(daoMatches, TRANSACTION_CATEGORIES.dao)
    });
  }
  
  // Check for security-focused transactions
  const securityMatches = TRANSACTION_CATEGORIES.security.filter(term => 
    txTypeLC.includes(term) || txNote.includes(term)
  ).length;
  
  if (securityMatches > 0) {
    results.push({
      category: 'security',
      confidence: calculateConfidence(securityMatches, TRANSACTION_CATEGORIES.security)
    });
  }
  
  // If no categories matched, classify as general
  if (results.length === 0) {
    results.push({
      category: 'general',
      confidence: 1.0
    });
  }
  
  return results;
}

/**
 * Advanced pattern detection in transaction history
 */
function detectTransactionPatterns(transactions: AlgorandTransaction[]): Map<string, number> {
  const patterns = new Map<string, number>();
  
  // Skip if not enough transactions for meaningful analysis
  if (transactions.length < 5) {
    return patterns;
  }
  
  // Sort transactions by timestamp
  const sortedTxs = [...transactions].sort((a, b) => a.timestamp - b.timestamp);
  
  // Detect regular staking pattern
  const stakingTxs = sortedTxs.filter(tx => 
    tx.type.toLowerCase().includes('staking') || 
    tx.type.toLowerCase().includes('stake') ||
    (tx.note && tx.note.toLowerCase().includes('stake'))
  );
  
  if (stakingTxs.length >= 3) {
    // Calculate average time between staking transactions
    let totalInterval = 0;
    let intervalCount = 0;
    
    for (let i = 1; i < stakingTxs.length; i++) {
      const interval = stakingTxs[i].timestamp - stakingTxs[i-1].timestamp;
      totalInterval += interval;
      intervalCount++;
    }
    
    const avgInterval = totalInterval / intervalCount;
    const intervalVariance = stakingTxs.reduce((variance, tx, i) => {
      if (i === 0) return variance;
      const interval = tx.timestamp - stakingTxs[i-1].timestamp;
      const diff = interval - avgInterval;
      return variance + (diff * diff);
    }, 0) / intervalCount;
    
    // If variance is low, this indicates regular staking
    const regularityScore = Math.max(0, 1 - (Math.sqrt(intervalVariance) / avgInterval));
    if (regularityScore > 0.7) {
      patterns.set('regular_staking', regularityScore);
    }
  }
  
  // Detect consistent participation
  const monthlyActivityMap = new Map<string, number>();
  
  sortedTxs.forEach(tx => {
    const date = new Date(tx.timestamp);
    const monthKey = `${date.getFullYear()}-${date.getMonth()+1}`;
    
    const current = monthlyActivityMap.get(monthKey) || 0;
    monthlyActivityMap.set(monthKey, current + 1);
  });
  
  const monthlyValues = Array.from(monthlyActivityMap.values());
  const monthsWithActivity = monthlyValues.length;
  const totalMonths = getMonthDifference(new Date(sortedTxs[0].timestamp), new Date());
  
  if (totalMonths > 0) {
    const consistencyScore = Math.min(1, monthsWithActivity / totalMonths);
    patterns.set('consistent_participation', consistencyScore);
  }
  
  // Detect ecosystem engagement diversity
  const categoryCountMap = new Map<string, number>();
  
  sortedTxs.forEach(tx => {
    const categories = advancedCategorizeTransaction(tx);
    categories.forEach(cat => {
      if (cat.category !== 'general') {
        const current = categoryCountMap.get(cat.category) || 0;
        categoryCountMap.set(cat.category, current + 1);
      }
    });
  });
  
  const uniqueCategories = categoryCountMap.size;
  if (uniqueCategories >= 2) {
    const diversityScore = Math.min(1, uniqueCategories / 4); // Max diversity would be all 4 categories
    patterns.set('diverse_ecosystem_engagement', diversityScore);
  }
  
  // Detect suspicious patterns
  
  // Multiple small transfers in short time windows
  const timeWindows = new Map<string, number[]>();
  const hourInMillis = 60 * 60 * 1000;
  
  sortedTxs.forEach(tx => {
    const hourWindow = Math.floor(tx.timestamp / hourInMillis);
    const amounts = timeWindows.get(hourWindow.toString()) || [];
    amounts.push(tx.amount);
    timeWindows.set(hourWindow.toString(), amounts);
  });
  
  let smallTransferWindows = 0;
  timeWindows.forEach((amounts, window) => {
    if (amounts.length >= 5 && amounts.every(amt => amt < 10)) {
      smallTransferWindows++;
    }
  });
  
  if (smallTransferWindows > 0) {
    const suspiciousScore = Math.min(1, smallTransferWindows / 5);
    patterns.set('multiple_small_transfers', suspiciousScore);
  }
  
  // Erratic timing (highly irregular intervals)
  if (sortedTxs.length >= 10) {
    const intervals = [];
    for (let i = 1; i < sortedTxs.length; i++) {
      intervals.push(sortedTxs[i].timestamp - sortedTxs[i-1].timestamp);
    }
    
    const meanInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    const stdDev = Math.sqrt(
      intervals.reduce((sum, val) => sum + Math.pow(val - meanInterval, 2), 0) / intervals.length
    );
    
    const coefficientOfVariation = stdDev / meanInterval;
    if (coefficientOfVariation > 2) {
      // Higher coefficient means more erratic timing
      const erraticScore = Math.min(1, (coefficientOfVariation - 2) / 3);
      patterns.set('erratic_timing', erraticScore);
    }
  }
  
  // High velocity transfers (rapid movement of funds through the wallet)
  const inflows = sortedTxs.filter(tx => tx.recipient === transactions[0].sender)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const outflows = sortedTxs.filter(tx => tx.sender === transactions[0].sender)
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  if (inflows > 0 && outflows / inflows > 0.9) {
    const velocityRatio = outflows / inflows;
    const velocityScore = Math.min(1, (velocityRatio - 0.9) * 10);
    patterns.set('high_velocity_transfers', velocityScore);
  }
  
  return patterns;
}

/**
 * Helper function to get months between dates
 */
function getMonthDifference(startDate: Date, endDate: Date): number {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() - startDate.getMonth()
  ) + 1; // Include partial months
}

/**
 * Network analysis based on transaction patterns
 */
function analyzeNetwork(transactions: AlgorandTransaction[]): {
  centralityScore: number,
  uniqueAddresses: number,
  repeatInteractions: number
} {
  // Skip if not enough transactions
  if (transactions.length < 3) {
    return {
      centralityScore: 0,
      uniqueAddresses: 0,
      repeatInteractions: 0
    };
  }
  
  const addresses = new Set<string>();
  const interactionCounts = new Map<string, number>();
  
  // Extract all unique addresses and interaction counts
  transactions.forEach(tx => {
    if (tx.recipient) {
      addresses.add(tx.recipient);
      const count = interactionCounts.get(tx.recipient) || 0;
      interactionCounts.set(tx.recipient, count + 1);
    }
  });
  
  const uniqueAddresses = addresses.size;
  
  // Calculate repeat interactions
  let repeatedInteractions = 0;
  interactionCounts.forEach(count => {
    if (count > 1) {
      repeatedInteractions += count - 1;
    }
  });
  
  // Centrality is higher when there's a good balance of unique addresses and repeat interactions
  const totalInteractions = transactions.length;
  const uniqueRatio = uniqueAddresses / totalInteractions;
  const repeatRatio = repeatedInteractions / totalInteractions;
  
  // Ideal balance is around 30% unique and 70% repeat
  const centralityScore = 1 - Math.abs(0.3 - uniqueRatio) - Math.abs(0.7 - repeatRatio);
  
  return {
    centralityScore: Math.max(0, centralityScore),
    uniqueAddresses,
    repeatInteractions: repeatedInteractions
  };
}

/**
 * Calculate advanced metrics from transaction history
 */
function calculateAdvancedMetrics(transactions: AlgorandTransaction[]): AdvancedTransactionMetrics {
  if (!transactions.length) {
    return {
      totalTransactions: 0,
      transactionFrequency: 0,
      averageTransactionSize: 0,
      transactionDiversity: 0,
      longevityMonths: 0,
      defiInteractions: 0,
      nftTransactions: 0,
      daoVotes: 0,
      consistencyScore: 0,
      interactionDiversity: 0,
      riskScore: 0,
      valueDistribution: 0,
      transactionGrowthRate: 0,
      regularity: 0,
      networkCentrality: 0,
      temporalPatterns: 0
    };
  }
  
  // Sort transactions by timestamp
  const sortedTxs = [...transactions].sort((a, b) => a.timestamp - b.timestamp);
  
  // Calculate basic metrics
  const oldestTx = sortedTxs[0];
  const currentTime = Date.now();
  const accountAgeMs = currentTime - oldestTx.timestamp;
  const longevityMonths = Math.max(1, Math.floor(accountAgeMs / (30 * 24 * 60 * 60 * 1000)));
  
  const totalAmount = transactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const averageTransactionSize = totalAmount / transactions.length;
  const transactionFrequency = transactions.length / longevityMonths;
  
  // Calculate diversity of transaction types
  const uniqueTypes = new Set(transactions.map(tx => tx.type)).size;
  const transactionDiversity = uniqueTypes;
  
  // Count DeFi, NFT, and DAO interactions with confidence weighting
  let defiInteractions = 0;
  let nftTransactions = 0;
  let daoVotes = 0;
  
  transactions.forEach(tx => {
    const categories = advancedCategorizeTransaction(tx);
    categories.forEach(cat => {
      if (cat.category === 'defi') defiInteractions += cat.confidence;
      if (cat.category === 'nft') nftTransactions += cat.confidence;
      if (cat.category === 'dao') daoVotes += cat.confidence;
    });
  });
  
  // Calculate consistency score
  const activityByMonth = new Map<number, number>();
  
  transactions.forEach(tx => {
    const txDate = new Date(tx.timestamp);
    const monthKey = txDate.getFullYear() * 12 + txDate.getMonth();
    const count = activityByMonth.get(monthKey) || 0;
    activityByMonth.set(monthKey, count + 1);
  });
  
  const months = Array.from(activityByMonth.keys()).sort();
  let activeMonths = months.length;
  let totalMonths = 0;
  
  if (months.length >= 2) {
    const firstMonth = months[0];
    const lastMonth = months[months.length - 1];
    totalMonths = lastMonth - firstMonth + 1;
  } else {
    totalMonths = 1;
  }
  
  const activityCounts = Array.from(activityByMonth.values());
  const avgActivity = activityCounts.reduce((sum, count) => sum + count, 0) / activeMonths;
  const activityVariance = activityCounts.reduce((sum, count) => {
    const diff = count - avgActivity;
    return sum + (diff * diff);
  }, 0) / activeMonths;
  
  // Consistency is higher when there's regular activity across months
  const activeRatio = activeMonths / totalMonths;
  const varianceRatio = Math.sqrt(activityVariance) / avgActivity;
  const consistencyScore = activeRatio * (1 - Math.min(1, varianceRatio));
  
  // Calculate interaction diversity
  const interactedAddresses = new Set<string>();
  transactions.forEach(tx => {
    if (tx.recipient) interactedAddresses.add(tx.recipient);
  });
  
  const interactionDiversity = Math.min(1, interactedAddresses.size / 50); // Normalize to max 50 addresses
  
  // Calculate transaction growth rate
  let growthRate = 0;
  
  if (months.length > 1) {
    const halfPoint = Math.floor(months.length / 2);
    const firstHalfActivity = months.slice(0, halfPoint).reduce((sum, month) => {
      return sum + (activityByMonth.get(month) || 0);
    }, 0);
    
    const secondHalfActivity = months.slice(halfPoint).reduce((sum, month) => {
      return sum + (activityByMonth.get(month) || 0);
    }, 0);
    
    // If first half has activity, calculate growth rate
    if (firstHalfActivity > 0) {
      growthRate = (secondHalfActivity - firstHalfActivity) / firstHalfActivity;
    }
  }
  
  // Normalize growth rate between 0 and 1
  const transactionGrowthRate = Math.max(0, Math.min(1, (growthRate + 1) / 2));
  
  // Calculate value distribution
  const amounts = transactions.map(tx => tx.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const amountRange = maxAmount - minAmount;
  
  const bucketCount = 5;
  const buckets = new Array(bucketCount).fill(0);
  
  // Skip if all transactions have the same amount
  let valueDistribution = 0;
  if (amountRange > 0) {
    transactions.forEach(tx => {
      const normalizedAmount = (tx.amount - minAmount) / amountRange;
      const bucketIndex = Math.min(bucketCount - 1, Math.floor(normalizedAmount * bucketCount));
      buckets[bucketIndex]++;
    });
    
    // Calculate entropy of distribution (higher is more evenly distributed)
    const totalTx = transactions.length;
    let entropy = 0;
    buckets.forEach(count => {
      if (count > 0) {
        const probability = count / totalTx;
        entropy -= probability * Math.log2(probability);
      }
    });
    
    // Normalize entropy to 0-1 range (max entropy for 5 buckets is log2(5) ≈ 2.32)
    valueDistribution = entropy / Math.log2(bucketCount);
  }
  
  // Calculate regularity (timing patterns)
  const intervals = [];
  for (let i = 1; i < sortedTxs.length; i++) {
    intervals.push(sortedTxs[i].timestamp - sortedTxs[i-1].timestamp);
  }
  
  let regularity = 0;
  if (intervals.length > 0) {
    const meanInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    const stdDev = Math.sqrt(
      intervals.reduce((sum, val) => sum + Math.pow(val - meanInterval, 2), 0) / intervals.length
    );
    
    // Coefficient of variation (lower means more regular)
    const cv = stdDev / meanInterval;
    regularity = Math.max(0, 1 - Math.min(1, cv / 2));
  }
  
  // Calculate network centrality
  const networkAnalysis = analyzeNetwork(transactions);
  const networkCentrality = networkAnalysis.centralityScore;
  
  // Calculate temporal patterns
  const patterns = detectTransactionPatterns(transactions);
  const temporalPatterns = Array.from(patterns.values()).reduce((sum, score) => sum + score, 0) / 
    Math.max(1, patterns.size);
  
  // Calculate risk score (lower is better)
  const suspiciousPatterns = [
    patterns.get('multiple_small_transfers') || 0,
    patterns.get('erratic_timing') || 0,
    patterns.get('high_velocity_transfers') || 0
  ];
  
  const positivePatterns = [
    patterns.get('regular_staking') || 0,
    patterns.get('consistent_participation') || 0,
    patterns.get('diverse_ecosystem_engagement') || 0
  ];
  
  const suspiciousScore = suspiciousPatterns.reduce((sum, score) => sum + score, 0) / 
    Math.max(1, suspiciousPatterns.filter(s => s > 0).length);
    
  const positiveScore = positivePatterns.reduce((sum, score) => sum + score, 0) / 
    Math.max(1, positivePatterns.filter(s => s > 0).length);
  
  // Risk score is higher for suspicious patterns and lower for positive patterns
  const riskScore = Math.max(0, Math.min(1, suspiciousScore - positiveScore + 0.5));
  
  return {
    totalTransactions: transactions.length,
    transactionFrequency,
    averageTransactionSize,
    transactionDiversity,
    longevityMonths,
    defiInteractions: Math.round(defiInteractions),
    nftTransactions: Math.round(nftTransactions),
    daoVotes: Math.round(daoVotes),
    consistencyScore,
    interactionDiversity,
    riskScore,
    valueDistribution,
    transactionGrowthRate,
    regularity,
    networkCentrality,
    temporalPatterns
  };
}

/**
 * Calculate advanced reputation factors based on metrics
 */
function calculateAdvancedFactors(metrics: AdvancedTransactionMetrics): AdvancedReputationFactors {
  // Calculate core factors
  const txHistoryBase = Math.min(metrics.totalTransactions / 2, 80);
  const txHistoryFreq = Math.min(metrics.transactionFrequency * 5, 20);
  const transactionHistoryScore = Math.floor(txHistoryBase + txHistoryFreq);
  
  const defiBase = Math.min(metrics.defiInteractions * 5, 80);
  const defiBonus = metrics.defiInteractions > 10 ? 20 : metrics.defiInteractions * 2;
  const defiParticipationScore = Math.floor(defiBase + defiBonus);
  
  const daoBase = Math.min(metrics.daoVotes * 10, 90);
  const daoBonus = metrics.daoVotes > 5 ? 10 : metrics.daoVotes * 2;
  const daoGovernanceScore = Math.floor(daoBase + daoBonus);
  
  const nftBase = Math.min(metrics.nftTransactions * 8, 80);
  const nftBonus = metrics.nftTransactions > 5 ? 20 : metrics.nftTransactions * 4;
  const nftActivityScore = Math.floor(nftBase + nftBonus);
  
  // Calculate advanced factors (all normalized to 0-100 scale)
  const consistencyFactor = Math.floor(metrics.consistencyScore * 100);
  const diversityFactor = Math.floor(
    (metrics.interactionDiversity * 0.5 + metrics.transactionDiversity / 10 * 0.5) * 100
  );
  const growthFactor = Math.floor(metrics.transactionGrowthRate * 100);
  
  // Risk assessment factor (higher score means lower risk)
  const riskAssessmentFactor = Math.floor((1 - metrics.riskScore) * 100);
  
  // Value distribution factor (rewards more varied transaction sizes)
  const valueDistributionFactor = Math.floor(metrics.valueDistribution * 100);
  
  // Network position factor
  const networkPositionFactor = Math.floor(metrics.networkCentrality * 100);
  
  // Temporal behavior factor (reflects patterns over time)
  const temporalBehaviorFactor = Math.floor(
    (metrics.regularity * 0.7 + metrics.temporalPatterns * 0.3) * 100
  );
  
  return {
    transactionHistoryScore,
    defiParticipationScore,
    daoGovernanceScore,
    nftActivityScore,
    consistencyFactor,
    diversityFactor,
    growthFactor,
    riskAssessmentFactor,
    valueDistributionFactor,
    networkPositionFactor,
    temporalBehaviorFactor
  };
}

/**
 * Calculate total reputation score with weighted factors
 */
function calculateAdvancedTotalScore(factors: AdvancedReputationFactors): number {
  // Apply weights to each factor
  const weightedScore = 
    factors.transactionHistoryScore * FACTOR_WEIGHTS.transactionHistory +
    factors.defiParticipationScore * FACTOR_WEIGHTS.defiParticipation +
    factors.daoGovernanceScore * FACTOR_WEIGHTS.daoGovernance +
    factors.nftActivityScore * FACTOR_WEIGHTS.nftActivity +
    factors.consistencyFactor * FACTOR_WEIGHTS.consistency +
    factors.diversityFactor * FACTOR_WEIGHTS.diversity +
    factors.growthFactor * FACTOR_WEIGHTS.growth +
    factors.riskAssessmentFactor * FACTOR_WEIGHTS.riskAssessment +
    factors.valueDistributionFactor * FACTOR_WEIGHTS.valueDistribution +
    factors.networkPositionFactor * FACTOR_WEIGHTS.networkPosition +
    factors.temporalBehaviorFactor * FACTOR_WEIGHTS.temporalBehavior;
  
  // Apply scaling to normalize to 0-1000 range
  return Math.floor(weightedScore * 10);
}

/**
 * Generate insights based on metrics and factors
 */
function generateInsights(
  metrics: AdvancedTransactionMetrics, 
  factors: AdvancedReputationFactors
): string[] {
  const insights: string[] = [];
  
  // Longevity insights
  if (metrics.longevityMonths >= 12) {
    insights.push(`Long-term wallet with ${metrics.longevityMonths} months of activity, indicating established presence on the blockchain.`);
  } else if (metrics.longevityMonths < 3) {
    insights.push(`Relatively new wallet with only ${metrics.longevityMonths} months of activity.`);
  }
  
  // Transaction patterns
  if (metrics.consistencyScore > 0.8) {
    insights.push(`Highly consistent transaction patterns showing regular blockchain activity.`);
  } else if (metrics.consistencyScore < 0.3 && metrics.totalTransactions > 10) {
    insights.push(`Irregular transaction patterns with sporadic activity periods.`);
  }
  
  // Ecosystem participation
  const ecosystemAreas = [];
  if (metrics.defiInteractions > 5) ecosystemAreas.push("DeFi");
  if (metrics.nftTransactions > 5) ecosystemAreas.push("NFTs");
  if (metrics.daoVotes > 3) ecosystemAreas.push("DAO governance");
  
  if (ecosystemAreas.length >= 2) {
    insights.push(`Active participation across multiple ecosystem areas: ${ecosystemAreas.join(", ")}.`);
  } else if (ecosystemAreas.length === 1) {
    insights.push(`Focused participation primarily in ${ecosystemAreas[0]}.`);
  }
  
  // Growth trajectory
  if (metrics.transactionGrowthRate > 0.7) {
    insights.push(`Strong positive growth in transaction activity, suggesting increasing blockchain engagement.`);
  } else if (metrics.transactionGrowthRate < 0.3 && metrics.totalTransactions > 10) {
    insights.push(`Declining transaction activity over time.`);
  }
  
  // Risk assessment
  if (metrics.riskScore < 0.2) {
    insights.push(`Very low risk profile with consistent patterns and healthy transaction behaviors.`);
  } else if (metrics.riskScore > 0.7) {
    insights.push(`Higher risk profile with some potentially concerning transaction patterns.`);
  }
  
  // Network position
  if (metrics.networkCentrality > 0.7) {
    insights.push(`Well-connected wallet with balanced transaction relationships.`);
  } else if (metrics.interactionDiversity > 0.8) {
    insights.push(`Diverse interaction profile with many different counterparties.`);
  } else if (metrics.interactionDiversity < 0.2 && metrics.totalTransactions > 5) {
    insights.push(`Limited interaction diversity with repeated transactions to few counterparties.`);
  }
  
  return insights;
}

/**
 * Detect anomalies in transaction history
 */
function detectAnomalies(metrics: AdvancedTransactionMetrics): string[] {
  const anomalies: string[] = [];
  
  // Detect unusual patterns
  if (metrics.riskScore > 0.7) {
    anomalies.push(`Unusual transaction patterns detected that diverge from typical wallet behavior.`);
  }
  
  // Detect irregular timing with high activity bursts
  if (metrics.regularity < 0.3 && metrics.transactionFrequency > 10) {
    anomalies.push(`Irregular transaction timing with bursts of high activity.`);
  }
  
  // Detect unusual value distribution
  if (metrics.valueDistribution < 0.2 && metrics.totalTransactions > 10) {
    anomalies.push(`Unusual concentration of transaction values in narrow ranges.`);
  }
  
  // Detect potential mixers or tumblers
  if (metrics.interactionDiversity > 0.9 && metrics.valueDistribution < 0.3 && metrics.totalTransactions > 20) {
    anomalies.push(`High number of unique counterparties with similar transaction values could indicate mixing behavior.`);
  }
  
  return anomalies;
}

/**
 * Generate recommendations for improving reputation
 */
function generateRecommendations(
  metrics: AdvancedTransactionMetrics, 
  factors: AdvancedReputationFactors
): string[] {
  const recommendations: string[] = [];
  
  // Consistency recommendations
  if (metrics.consistencyScore < 0.5) {
    recommendations.push(`Maintain more consistent blockchain activity across time periods.`);
  }
  
  // Ecosystem diversification
  const lowEcosystems = [];
  if (factors.defiParticipationScore < 50) lowEcosystems.push("DeFi");
  if (factors.nftActivityScore < 50) lowEcosystems.push("NFT");
  if (factors.daoGovernanceScore < 50) lowEcosystems.push("DAO governance");
  
  if (lowEcosystems.length > 0) {
    recommendations.push(`Diversify participation into ${lowEcosystems.join(", ")} to build a more rounded reputation profile.`);
  }
  
  // Transaction history
  if (factors.transactionHistoryScore < 70) {
    recommendations.push(`Increase overall transaction volume and frequency to build a stronger history.`);
  }
  
  // Risk management
  if (factors.riskAssessmentFactor < 70) {
    recommendations.push(`Establish more regular transaction patterns and avoid rapid transfers of funds.`);
  }
  
  // Network position
  if (factors.networkPositionFactor < 60) {
    recommendations.push(`Develop more balanced transaction relationships with repeating counterparties.`);
  }
  
  return recommendations;
}

/**
 * Predict reputation growth based on current metrics
 */
function predictReputationGrowth(
  metrics: AdvancedTransactionMetrics, 
  currentScore: number
): number {
  // Base growth prediction
  let predictedGrowth = 0;
  
  // Growth based on current trajectory
  if (metrics.transactionGrowthRate > 0.5) {
    predictedGrowth += 50; // Strong growth
  } else if (metrics.transactionGrowthRate > 0.3) {
    predictedGrowth += 30; // Moderate growth
  } else if (metrics.transactionGrowthRate > 0) {
    predictedGrowth += 10; // Slight growth
  }
  
  // Growth based on consistency
  if (metrics.consistencyScore > 0.7) {
    predictedGrowth += 20; // Very consistent
  } else if (metrics.consistencyScore > 0.4) {
    predictedGrowth += 10; // Moderately consistent
  }
  
  // Growth based on risk score (lower risk = more growth)
  if (metrics.riskScore < 0.3) {
    predictedGrowth += 20; // Low risk
  } else if (metrics.riskScore < 0.6) {
    predictedGrowth += 5; // Medium risk
  } else {
    predictedGrowth -= 10; // High risk
  }
  
  // Growth based on ecosystem participation
  const ecosystemCount = [
    metrics.defiInteractions > 0,
    metrics.nftTransactions > 0,
    metrics.daoVotes > 0
  ].filter(Boolean).length;
  
  predictedGrowth += ecosystemCount * 10;
  
  // Apply ceiling effect (harder to grow with higher scores)
  const maxPossibleGrowth = 1000 - currentScore;
  const growthCeilingFactor = Math.pow(maxPossibleGrowth / 1000, 0.5);
  
  return Math.min(maxPossibleGrowth, Math.round(predictedGrowth * growthCeilingFactor));
}

/**
 * Main function to perform advanced analysis of wallet reputation
 */
export async function analyzeWalletReputationAdvanced(walletAddress: string): Promise<AdvancedReputationAnalysis> {
  // Get wallet transactions
  const transactions = await getWalletTransactions(walletAddress);
  
  // Calculate advanced metrics
  const metrics = calculateAdvancedMetrics(transactions);
  
  // Calculate advanced factors
  const factors = calculateAdvancedFactors(metrics);
  
  // Calculate total score
  const totalScore = calculateAdvancedTotalScore(factors);
  
  // Generate insights
  const insights = generateInsights(metrics, factors);
  
  // Detect anomalies
  const anomalies = detectAnomalies(metrics);
  
  // Generate recommendations
  const recommendations = generateRecommendations(metrics, factors);
  
  // Predict future growth
  const predictedGrowth = predictReputationGrowth(metrics, totalScore);
  
  // Calculate confidence score (higher with more transactions)
  const txConfidence = Math.min(1, transactions.length / 100);
  const timeConfidence = Math.min(1, metrics.longevityMonths / 12);
  const confidenceScore = Math.round((txConfidence * 0.7 + timeConfidence * 0.3) * 100);
  
  // Calculate contribution of each factor to the total score
  const factorBreakdown: {[key: string]: number} = {
    "Transaction History": Math.round(factors.transactionHistoryScore * FACTOR_WEIGHTS.transactionHistory * 10),
    "DeFi Participation": Math.round(factors.defiParticipationScore * FACTOR_WEIGHTS.defiParticipation * 10),
    "DAO Governance": Math.round(factors.daoGovernanceScore * FACTOR_WEIGHTS.daoGovernance * 10),
    "NFT Activity": Math.round(factors.nftActivityScore * FACTOR_WEIGHTS.nftActivity * 10),
    "Consistency": Math.round(factors.consistencyFactor * FACTOR_WEIGHTS.consistency * 10),
    "Transaction Diversity": Math.round(factors.diversityFactor * FACTOR_WEIGHTS.diversity * 10),
    "Account Growth": Math.round(factors.growthFactor * FACTOR_WEIGHTS.growth * 10),
    "Risk Assessment": Math.round(factors.riskAssessmentFactor * FACTOR_WEIGHTS.riskAssessment * 10),
    "Value Distribution": Math.round(factors.valueDistributionFactor * FACTOR_WEIGHTS.valueDistribution * 10),
    "Network Position": Math.round(factors.networkPositionFactor * FACTOR_WEIGHTS.networkPosition * 10),
    "Temporal Behavior": Math.round(factors.temporalBehaviorFactor * FACTOR_WEIGHTS.temporalBehavior * 10)
  };
  
  return {
    totalScore,
    confidenceScore,
    factorBreakdown,
    factors,
    metrics,
    insights,
    anomalies,
    recommendations,
    predictedGrowth
  };
}