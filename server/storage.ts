import { 
  users, 
  strategies, 
  learningResources, 
  type User, 
  type InsertUser, 
  type Strategy, 
  type InsertStrategy,
  type LearningResource,
  type InsertLearningResource 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Strategies
  getStrategies(userId: number): Promise<Strategy[]>;
  getStrategy(id: number): Promise<Strategy | undefined>;
  createStrategy(strategy: InsertStrategy): Promise<Strategy>;
  updateStrategy(id: number, strategy: Partial<Strategy>): Promise<Strategy | undefined>;
  deleteStrategy(id: number): Promise<boolean>;
  
  // Learning Resources
  getLearningResources(): Promise<LearningResource[]>;
  getLearningResource(id: number): Promise<LearningResource | undefined>;
  updateLearningResourceProgress(id: number, progress: number): Promise<LearningResource | undefined>;
  createLearningResource(resource: InsertLearningResource): Promise<LearningResource>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private strategies: Map<number, Strategy>;
  private learningResources: Map<number, LearningResource>;
  currentUserId: number;
  currentStrategyId: number;
  currentResourceId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.strategies = new Map();
    this.learningResources = new Map();
    this.currentUserId = 1;
    this.currentStrategyId = 1;
    this.currentResourceId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with some default learning resources
    this.initializeLearningResources();
    
    // Add a default user for testing
    this.createUser({
      username: 'test',
      password: 'password123', // Would be hashed in a real scenario
      email: 'test@example.com'
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      walletAddress: insertUser.walletAddress || null,
      displayName: insertUser.displayName || null
    };
    this.users.set(id, user);
    return user;
  }
  
  // Strategies
  async getStrategies(userId: number): Promise<Strategy[]> {
    return Array.from(this.strategies.values()).filter(
      (strategy) => strategy.userId === userId,
    );
  }
  
  async getStrategy(id: number): Promise<Strategy | undefined> {
    return this.strategies.get(id);
  }
  
  async createStrategy(insertStrategy: InsertStrategy): Promise<Strategy> {
    const id = this.currentStrategyId++;
    const now = new Date();
    const strategy: Strategy = { 
      ...insertStrategy, 
      id,
      created: now
    };
    this.strategies.set(id, strategy);
    return strategy;
  }
  
  async updateStrategy(id: number, updatedFields: Partial<Strategy>): Promise<Strategy | undefined> {
    const strategy = this.strategies.get(id);
    if (!strategy) return undefined;
    
    const updatedStrategy = { ...strategy, ...updatedFields };
    this.strategies.set(id, updatedStrategy);
    return updatedStrategy;
  }
  
  async deleteStrategy(id: number): Promise<boolean> {
    return this.strategies.delete(id);
  }
  
  // Learning Resources
  async getLearningResources(): Promise<LearningResource[]> {
    return Array.from(this.learningResources.values());
  }
  
  async getLearningResource(id: number): Promise<LearningResource | undefined> {
    return this.learningResources.get(id);
  }
  
  async updateLearningResourceProgress(id: number, progress: number): Promise<LearningResource | undefined> {
    const resource = this.learningResources.get(id);
    if (!resource) return undefined;
    
    let status = resource.status;
    if (progress === 100) {
      status = 'completed';
    } else if (progress > 0) {
      status = 'in-progress';
    }
    
    const updatedResource = { ...resource, progress, status };
    this.learningResources.set(id, updatedResource);
    return updatedResource;
  }
  
  async createLearningResource(insertResource: InsertLearningResource): Promise<LearningResource> {
    const id = this.currentResourceId++;
    const resource: LearningResource = { 
      ...insertResource, 
      id,
      progress: insertResource.progress || 0 
    };
    this.learningResources.set(id, resource);
    return resource;
  }
  
  // Initialize with some default learning resources
  private initializeLearningResources() {
    const defaultResources: InsertLearningResource[] = [
      {
        title: 'HFT Fundamentals',
        description: 'Learn the basics of high-frequency trading and key strategies.',
        type: 'course',
        status: 'completed',
        progress: 100,
        icon: 'fas fa-graduation-cap',
      },
      {
        title: 'Arbitrage Strategies',
        description: 'Discover how to identify and execute arbitrage opportunities.',
        type: 'course',
        status: 'completed',
        progress: 100,
        icon: 'fas fa-exchange-alt',
      },
      {
        title: 'Building with SEI',
        description: 'Learn how to leverage SEI blockchain for HFT strategies.',
        type: 'course',
        status: 'in-progress',
        progress: 65,
        icon: 'fas fa-robot',
      },
      {
        title: 'Advanced Technical Analysis',
        description: 'Master technical indicators for better trading decisions.',
        type: 'tutorial',
        status: 'locked',
        progress: 0,
        icon: 'fas fa-chart-area',
      },
      {
        title: 'AI in Algorithmic Trading',
        description: 'Explore AI and ML applications in trading strategies.',
        type: 'guide',
        status: 'locked',
        progress: 0,
        icon: 'fas fa-brain',
      },
    ];
    
    defaultResources.forEach(resource => {
      const id = this.currentResourceId++;
      this.learningResources.set(id, { ...resource, id });
    });
  }
}

export const storage = new MemStorage();
