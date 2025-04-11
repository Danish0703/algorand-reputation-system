import { 
  users, 
  reputationScores, 
  reputationFactors, 
  soulboundNfts, 
  transactions,
  type User, 
  type InsertUser, 
  type ReputationScore, 
  type InsertReputationScore,
  type ReputationFactor,
  type InsertReputationFactor,
  type SoulboundNft,
  type InsertSoulboundNft,
  type Transaction,
  type InsertTransaction
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Reputation Score methods
  getReputationScore(walletAddress: string): Promise<ReputationScore | undefined>;
  createReputationScore(score: InsertReputationScore): Promise<ReputationScore>;
  updateReputationScore(walletAddress: string, score: Partial<InsertReputationScore>): Promise<ReputationScore | undefined>;

  // Reputation Factors methods
  getReputationFactors(walletAddress: string): Promise<ReputationFactor[]>;
  createReputationFactor(factor: InsertReputationFactor): Promise<ReputationFactor>;
  updateReputationFactor(id: number, factor: Partial<InsertReputationFactor>): Promise<ReputationFactor | undefined>;

  // Soulbound NFT methods
  getSoulboundNfts(walletAddress: string): Promise<SoulboundNft[]>;
  createSoulboundNft(nft: InsertSoulboundNft): Promise<SoulboundNft>;

  // Transaction methods
  getTransactions(walletAddress: string, limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionByTxId(txId: string): Promise<Transaction | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reputationScores: Map<string, ReputationScore>;
  private reputationFactors: Map<number, ReputationFactor>;
  private soulboundNfts: Map<number, SoulboundNft>;
  private transactions: Map<number, Transaction>;
  
  currentUserId: number;
  currentReputationFactorId: number;
  currentSoulboundNftId: number;
  currentTransactionId: number;

  constructor() {
    this.users = new Map();
    this.reputationScores = new Map();
    this.reputationFactors = new Map();
    this.soulboundNfts = new Map();
    this.transactions = new Map();
    
    this.currentUserId = 1;
    this.currentReputationFactorId = 1;
    this.currentSoulboundNftId = 1;
    this.currentTransactionId = 1;
    
    // Initialize with some example data for demo purposes
    this.initializeExampleData();
  }

  private initializeExampleData() {
    const walletAddress = "ALGO1234567890XXXX";
    
    // Create reputation score
    this.reputationScores.set(walletAddress, {
      id: 1,
      userId: null,
      walletAddress,
      score: 785,
      consistency: 92,
      longevity: 28, // months
      diversity: 76,
      lastUpdated: new Date()
    });
    
    // Create reputation factors
    const factors = [
      { name: "Transaction History", score: 92, maxScore: 100 },
      { name: "DeFi Participation", score: 78, maxScore: 100 },
      { name: "DAO Governance", score: 65, maxScore: 100 },
      { name: "NFT Activity", score: 88, maxScore: 100 }
    ];
    
    factors.forEach((factor, index) => {
      this.reputationFactors.set(this.currentReputationFactorId, {
        id: this.currentReputationFactorId++,
        walletAddress,
        factorName: factor.name,
        score: factor.score,
        maxScore: factor.maxScore
      });
    });
    
    // Create NFTs
    const nfts = [
      {
        name: "Verified DeFi Participant",
        description: "Awarded for active participation in DeFi protocols",
        imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
        level: 3,
        assetId: 12345,
        issueDate: new Date(2023, 5, 15) // June 15, 2023
      },
      {
        name: "DAO Contributor",
        description: "Awarded for participation in DAO governance",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
        level: 2,
        assetId: 12346,
        issueDate: new Date(2023, 3, 8) // April 8, 2023
      }
    ];
    
    nfts.forEach(nft => {
      this.soulboundNfts.set(this.currentSoulboundNftId, {
        id: this.currentSoulboundNftId++,
        walletAddress,
        ...nft
      });
    });
    
    // Create transactions
    const transactionData = [
      {
        txId: "6Z3QR...9M7P",
        type: "Liquidity Provisioning",
        amount: "+285 ALGO",
        date: new Date(2023, 6, 15), // July 15, 2023
        reputationPoints: 8,
        aiAnalyzed: true
      },
      {
        txId: "9K2PR...4T1R",
        type: "DAO Voting",
        amount: "0.001 ALGO",
        date: new Date(2023, 6, 12), // July 12, 2023
        reputationPoints: 5,
        aiAnalyzed: true
      },
      {
        txId: "1F4TR...7G9Z",
        type: "NFT Purchase",
        amount: "-45 ALGO",
        date: new Date(2023, 6, 8), // July 8, 2023
        reputationPoints: 3,
        aiAnalyzed: true
      }
    ];
    
    transactionData.forEach(tx => {
      this.transactions.set(this.currentTransactionId, {
        id: this.currentTransactionId++,
        walletAddress,
        ...tx
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Reputation Score methods
  async getReputationScore(walletAddress: string): Promise<ReputationScore | undefined> {
    return this.reputationScores.get(walletAddress);
  }

  async createReputationScore(score: InsertReputationScore): Promise<ReputationScore> {
    const newScore: ReputationScore = {
      id: this.currentUserId++,
      ...score
    };
    this.reputationScores.set(score.walletAddress, newScore);
    return newScore;
  }

  async updateReputationScore(
    walletAddress: string, 
    updatedScore: Partial<InsertReputationScore>
  ): Promise<ReputationScore | undefined> {
    const existingScore = this.reputationScores.get(walletAddress);
    if (!existingScore) return undefined;
    
    const updated = { ...existingScore, ...updatedScore };
    this.reputationScores.set(walletAddress, updated);
    return updated;
  }

  // Reputation Factors methods
  async getReputationFactors(walletAddress: string): Promise<ReputationFactor[]> {
    return Array.from(this.reputationFactors.values()).filter(
      factor => factor.walletAddress === walletAddress
    );
  }

  async createReputationFactor(factor: InsertReputationFactor): Promise<ReputationFactor> {
    const id = this.currentReputationFactorId++;
    const newFactor: ReputationFactor = { id, ...factor };
    this.reputationFactors.set(id, newFactor);
    return newFactor;
  }

  async updateReputationFactor(
    id: number, 
    updatedFactor: Partial<InsertReputationFactor>
  ): Promise<ReputationFactor | undefined> {
    const existingFactor = this.reputationFactors.get(id);
    if (!existingFactor) return undefined;
    
    const updated = { ...existingFactor, ...updatedFactor };
    this.reputationFactors.set(id, updated);
    return updated;
  }

  // Soulbound NFT methods
  async getSoulboundNfts(walletAddress: string): Promise<SoulboundNft[]> {
    return Array.from(this.soulboundNfts.values()).filter(
      nft => nft.walletAddress === walletAddress
    );
  }

  async createSoulboundNft(nft: InsertSoulboundNft): Promise<SoulboundNft> {
    const id = this.currentSoulboundNftId++;
    const newNft: SoulboundNft = { id, ...nft };
    this.soulboundNfts.set(id, newNft);
    return newNft;
  }

  // Transaction methods
  async getTransactions(walletAddress: string, limit = 100): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(tx => tx.walletAddress === walletAddress)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const newTransaction: Transaction = { id, ...transaction };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  async getTransactionByTxId(txId: string): Promise<Transaction | undefined> {
    return Array.from(this.transactions.values()).find(
      tx => tx.txId === txId
    );
  }
}

export const storage = new MemStorage();
