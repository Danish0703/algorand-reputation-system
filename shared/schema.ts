import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address").unique(),
});

export const reputationScores = pgTable("reputation_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  walletAddress: text("wallet_address").notNull().unique(),
  score: integer("score").notNull(),
  consistency: integer("consistency").notNull(),
  longevity: integer("longevity").notNull(),
  diversity: integer("diversity").notNull(),
  lastUpdated: timestamp("last_updated").notNull(),
});

export const reputationFactors = pgTable("reputation_factors", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  factorName: text("factor_name").notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
});

export const soulboundNfts = pgTable("soulbound_nfts", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  assetId: integer("asset_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  level: integer("level").notNull(),
  issueDate: timestamp("issue_date").notNull(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  txId: text("tx_id").notNull().unique(),
  walletAddress: text("wallet_address").notNull(),
  type: text("type").notNull(),
  amount: text("amount").notNull(),
  date: timestamp("date").notNull(),
  reputationPoints: integer("reputation_points"),
  aiAnalyzed: boolean("ai_analyzed").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
});

export const insertReputationScoreSchema = createInsertSchema(reputationScores).omit({
  id: true,
});

export const insertReputationFactorSchema = createInsertSchema(reputationFactors).omit({
  id: true,
});

export const insertSoulboundNftSchema = createInsertSchema(soulboundNfts).omit({
  id: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertReputationScore = z.infer<typeof insertReputationScoreSchema>;
export type ReputationScore = typeof reputationScores.$inferSelect;

export type InsertReputationFactor = z.infer<typeof insertReputationFactorSchema>;
export type ReputationFactor = typeof reputationFactors.$inferSelect;

export type InsertSoulboundNft = z.infer<typeof insertSoulboundNftSchema>;
export type SoulboundNft = typeof soulboundNfts.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
