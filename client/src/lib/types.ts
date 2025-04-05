// Strategy Types
export type StrategyComponentType = 'indicator' | 'buy-signal' | 'sell-signal' | 'filter' | 'logic';

export interface StrategyConnection {
  id: string;
  fromId: string;
  toId: string;
  fromSocket?: string;
  toSocket?: string;
}

export interface StrategyComponent {
  id: string;
  type: StrategyComponentType;
  name: string;
  icon: string;
  parameters?: Record<string, any>;
  position: { x: number; y: number };
  inputs?: string[];
  outputs?: string[];
  canConnect?: boolean;
}

export interface StrategyParameterDefinition {
  id: string;
  name: string;
  type: 'number' | 'boolean' | 'string' | 'select';
  description?: string;
  defaultValue: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}

export interface StrategyComponentDefinition {
  type: StrategyComponentType;
  name: string;
  icon: string;
  bgColor: string;
  description: string;
  inputs: string[];
  outputs: string[];
  parameters: StrategyParameterDefinition[];
}

export interface MarketData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  iconSymbol: string;
  iconColor: string;
}

export interface ArbitrageOpportunity {
  symbol: string;
  name: string;
  percentage: string;
  route: string;
  volume: string;
  iconSymbol: string;
  iconColor: string;
}

export interface SummaryCardData {
  title: string;
  value: string;
  change?: string;
  status?: string;
  isPositive?: boolean;
  icon: string;
  iconBg: string;
}

export interface StrategyData {
  id: string;
  name: string;
  type: string;
  icon: string;
  iconBg: string;
  createdDate: string;
  assets: {
    symbols: string[];
    pair: string;
  };
  value: string;
  profitLoss: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  trades: number;
  status: 'active' | 'monitoring' | 'underperforming';
}

export interface LearningResourceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
}

// Charts
export interface ChartData {
  date: string;
  value: number;
}
