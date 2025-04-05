import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  displayName: text("display_name"),
});

export const strategies = pgTable("strategies", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // momentum, arbitrage, market-making, custom
  tradingPair: text("trading_pair").notNull(), // BTC/USDT, ETH/USDT, etc.
  initialInvestment: integer("initial_investment").notNull(),
  riskLevel: integer("risk_level").notNull(),
  status: text("status").notNull(), // active, paused, monitoring, underperforming
  configuration: jsonb("configuration").notNull(), // Stores the strategy blocks configuration
  created: timestamp("created").notNull().defaultNow(),
});

export const learningResources = pgTable("learning_resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // course, tutorial, guide
  status: text("status").notNull(), // completed, in-progress, locked
  progress: integer("progress").notNull().default(0), // Percentage of completion
  icon: text("icon").notNull(), // Font Awesome icon class
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
  displayName: true,
});

export const insertStrategySchema = createInsertSchema(strategies).omit({
  id: true,
  created: true,
});

export const insertLearningResourceSchema = createInsertSchema(learningResources).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStrategy = z.infer<typeof insertStrategySchema>;
export type Strategy = typeof strategies.$inferSelect;

export type InsertLearningResource = z.infer<typeof insertLearningResourceSchema>;
export type LearningResource = typeof learningResources.$inferSelect;
