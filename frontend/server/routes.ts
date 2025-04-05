import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertStrategySchema, insertLearningResourceSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";
import express from "express";

// Auth middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup middleware
  app.use(express.json());
  
  // Setup authentication routes
  setupAuth(app);
  
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Users API is handled by auth.ts
  // This is kept for backward compatibility but shouldn't be used
  app.post('/api/users', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create user' });
      }
    }
  });

  // Strategies - Protected Routes
  app.get('/api/strategies', requireAuth, async (req, res) => {
    try {
      // Use authenticated user ID from session
      const userId = req.user?.id || 0;
      const strategies = await storage.getStrategies(userId);
      res.json(strategies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch strategies' });
    }
  });

  app.get('/api/strategies/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const strategy = await storage.getStrategy(id);
      
      if (!strategy) {
        return res.status(404).json({ error: 'Strategy not found' });
      }
      
      // Check if strategy belongs to current user
      if (strategy.userId !== req.user?.id) {
        return res.status(403).json({ error: 'Not authorized to view this strategy' });
      }
      
      res.json(strategy);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch strategy' });
    }
  });

  app.post('/api/strategies', requireAuth, async (req, res) => {
    try {
      // Add the user ID to the strategy data
      const strategyData = insertStrategySchema.parse({
        ...req.body,
        userId: req.user?.id
      });
      
      const strategy = await storage.createStrategy(strategyData);
      res.status(201).json(strategy);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create strategy' });
      }
    }
  });

  app.patch('/api/strategies/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const strategy = await storage.getStrategy(id);
      
      if (!strategy) {
        return res.status(404).json({ error: 'Strategy not found' });
      }
      
      // Check if strategy belongs to current user
      if (strategy.userId !== req.user?.id) {
        return res.status(403).json({ error: 'Not authorized to update this strategy' });
      }
      
      // We're allowing partial updates
      const updatedStrategy = await storage.updateStrategy(id, req.body);
      res.json(updatedStrategy);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update strategy' });
    }
  });

  app.delete('/api/strategies/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const strategy = await storage.getStrategy(id);
      
      if (!strategy) {
        return res.status(404).json({ error: 'Strategy not found' });
      }
      
      // Check if strategy belongs to current user
      if (strategy.userId !== req.user?.id) {
        return res.status(403).json({ error: 'Not authorized to delete this strategy' });
      }
      
      const success = await storage.deleteStrategy(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete strategy' });
    }
  });

  // Learning Resources - Protected Routes
  app.get('/api/learning-resources', requireAuth, async (req, res) => {
    try {
      const resources = await storage.getLearningResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch learning resources' });
    }
  });

  app.get('/api/learning-resources/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await storage.getLearningResource(id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Learning resource not found' });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch learning resource' });
    }
  });

  app.patch('/api/learning-resources/:id/progress', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { progress } = req.body;
      
      if (typeof progress !== 'number' || progress < 0 || progress > 100) {
        return res.status(400).json({ error: 'Invalid progress value' });
      }
      
      const updatedResource = await storage.updateLearningResourceProgress(id, progress);
      
      if (!updatedResource) {
        return res.status(404).json({ error: 'Learning resource not found' });
      }
      
      res.json(updatedResource);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update learning resource progress' });
    }
  });

  app.post('/api/learning-resources', requireAuth, async (req, res) => {
    try {
      // Only admins should be able to create learning resources in a real app
      const resourceData = insertLearningResourceSchema.parse(req.body);
      const resource = await storage.createLearningResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create learning resource' });
      }
    }
  });

  // SEI Blockchain Info (mock)
  app.get('/api/sei/stats', async (req, res) => {
    res.json({
      blockFinality: 390, // milliseconds
      blockHeight: 12345678,
      networkStatus: 'optimal',
      tradingVolume24h: 1248650,
      activeValidators: 120
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
