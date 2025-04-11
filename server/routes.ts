import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculateReputationScore, createSoulboundNFT, recordTransaction } from "./algorand";
import { analyzeWalletReputation } from "./ai/reputationModel";
import { analyzeWalletReputationAdvanced } from "./ai/advancedReputationModel";
import { insertReputationScoreSchema, insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // Get reputation score for a wallet
  app.get("/api/reputation/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const reputationScore = await storage.getReputationScore(walletAddress);
      
      if (!reputationScore) {
        return res.status(404).json({ message: "Reputation score not found for this wallet" });
      }
      
      res.json(reputationScore);
    } catch (error) {
      console.error("Error fetching reputation score:", error);
      res.status(500).json({ message: "Failed to fetch reputation score" });
    }
  });

  // Get reputation factors for a wallet
  app.get("/api/reputation/:walletAddress/factors", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const factors = await storage.getReputationFactors(walletAddress);
      
      res.json(factors);
    } catch (error) {
      console.error("Error fetching reputation factors:", error);
      res.status(500).json({ message: "Failed to fetch reputation factors" });
    }
  });

  // Get Soulbound NFTs for a wallet
  app.get("/api/nfts/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const nfts = await storage.getSoulboundNfts(walletAddress);
      
      res.json(nfts);
    } catch (error) {
      console.error("Error fetching Soulbound NFTs:", error);
      res.status(500).json({ message: "Failed to fetch Soulbound NFTs" });
    }
  });

  // Get transactions for a wallet
  app.get("/api/transactions/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      const transactions = await storage.getTransactions(walletAddress, limit);
      
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Run AI analysis on a wallet
  app.post("/api/analyze/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      
      // Run AI analysis
      const analysis = await analyzeWalletReputation(walletAddress);
      
      // Update reputation score based on analysis
      const updatedScore = await calculateReputationScore(walletAddress);
      
      // Create reputationFactor records based on analysis results
      await Promise.all([
        storage.createReputationFactor({
          walletAddress,
          factorName: "Transaction History",
          score: analysis.factors.transactionHistoryScore,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "DeFi Participation",
          score: analysis.factors.defiParticipationScore,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "DAO Governance",
          score: analysis.factors.daoGovernanceScore,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "NFT Activity",
          score: analysis.factors.nftActivityScore,
          maxScore: 100
        })
      ]);
      
      res.json({
        score: updatedScore,
        analysis: analysis
      });
    } catch (error) {
      console.error("Error running AI analysis:", error);
      res.status(500).json({ message: "Failed to analyze wallet" });
    }
  });

  // Create a Soulbound NFT for a wallet
  app.post("/api/nfts/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      const { name, description, imageUrl, level } = req.body;
      
      if (!name || !imageUrl || !level) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const assetId = await createSoulboundNFT(
        walletAddress,
        name,
        description || "",
        imageUrl,
        level
      );
      
      const nft = await storage.getSoulboundNfts(walletAddress);
      
      res.status(201).json({
        message: "Soulbound NFT created successfully",
        assetId,
        nft: nft.find(n => n.assetId === assetId)
      });
    } catch (error) {
      console.error("Error creating Soulbound NFT:", error);
      res.status(500).json({ message: "Failed to create Soulbound NFT" });
    }
  });

  // Record a new transaction
  app.post("/api/transactions/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      
      // Validate request body against schema
      const validatedData = insertTransactionSchema.parse({
        ...req.body,
        walletAddress,
        date: new Date()
      });
      
      // Record the transaction
      await recordTransaction(
        validatedData.walletAddress,
        validatedData.txId,
        validatedData.type,
        validatedData.amount,
        validatedData.aiAnalyzed || false
      );
      
      res.status(201).json({
        message: "Transaction recorded successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      
      console.error("Error recording transaction:", error);
      res.status(500).json({ message: "Failed to record transaction" });
    }
  });

  // Run Advanced AI analysis on a wallet
  app.post("/api/analyze-advanced/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      
      // Run Advanced AI analysis
      const advancedAnalysis = await analyzeWalletReputationAdvanced(walletAddress);
      
      // Update reputation score based on analysis
      const updatedScore = await calculateReputationScore(walletAddress);
      
      // Create reputationFactor records based on analysis results
      await Promise.all([
        storage.createReputationFactor({
          walletAddress,
          factorName: "Transaction History",
          score: advancedAnalysis.factors.transactionHistoryScore,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "DeFi Participation",
          score: advancedAnalysis.factors.defiParticipationScore,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "DAO Governance",
          score: advancedAnalysis.factors.daoGovernanceScore,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "NFT Activity",
          score: advancedAnalysis.factors.nftActivityScore,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "Consistency",
          score: advancedAnalysis.factors.consistencyFactor,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "Diversity",
          score: advancedAnalysis.factors.diversityFactor,
          maxScore: 100
        }),
        storage.createReputationFactor({
          walletAddress,
          factorName: "Growth",
          score: advancedAnalysis.factors.growthFactor,
          maxScore: 100
        })
      ]);
      
      res.json({
        score: updatedScore,
        analysis: advancedAnalysis
      });
    } catch (error) {
      console.error("Error running Advanced AI analysis:", error);
      res.status(500).json({ message: "Failed to analyze wallet with advanced model" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
