import { StrategyComponentDefinition } from '@/lib/types';

// Component definitions for the strategy builder
export const COMPONENT_DEFINITIONS: StrategyComponentDefinition[] = [
  // Indicators
  {
    type: 'indicator',
    name: 'RSI Indicator',
    icon: 'fas fa-chart-line text-primary-light',
    bgColor: 'bg-primary-dark/30',
    description: 'Relative Strength Index (RSI) measures the speed and magnitude of price movements',
    inputs: [],
    outputs: ['signal'],
    parameters: [
      {
        id: 'period',
        name: 'Period',
        type: 'number',
        description: 'Number of periods to calculate RSI',
        defaultValue: 14,
        min: 2,
        max: 50,
        step: 1,
        required: true
      },
      {
        id: 'overbought',
        name: 'Overbought Level',
        type: 'number',
        description: 'Level above which an asset is considered overbought',
        defaultValue: 70,
        min: 50,
        max: 100,
        step: 1,
        required: true
      },
      {
        id: 'oversold',
        name: 'Oversold Level',
        type: 'number',
        description: 'Level below which an asset is considered oversold',
        defaultValue: 30,
        min: 0,
        max: 50,
        step: 1,
        required: true
      }
    ]
  },
  {
    type: 'indicator',
    name: 'MACD Indicator',
    icon: 'fas fa-chart-bar text-blue-500',
    bgColor: 'bg-blue-500/30',
    description: 'Moving Average Convergence Divergence tracks the relationship between two moving averages',
    inputs: [],
    outputs: ['signal'],
    parameters: [
      {
        id: 'fastPeriod',
        name: 'Fast Period',
        type: 'number',
        description: 'Number of periods for fast EMA',
        defaultValue: 12,
        min: 2,
        max: 50,
        step: 1,
        required: true
      },
      {
        id: 'slowPeriod',
        name: 'Slow Period',
        type: 'number',
        description: 'Number of periods for slow EMA',
        defaultValue: 26,
        min: 2,
        max: 100,
        step: 1,
        required: true
      },
      {
        id: 'signalPeriod',
        name: 'Signal Period',
        type: 'number',
        description: 'Number of periods for signal line',
        defaultValue: 9,
        min: 2,
        max: 50,
        step: 1,
        required: true
      }
    ]
  },
  {
    type: 'indicator',
    name: 'Moving Average',
    icon: 'fas fa-wave-square text-indigo-400',
    bgColor: 'bg-indigo-500/30',
    description: 'Simple Moving Average (SMA) or Exponential Moving Average (EMA)',
    inputs: [],
    outputs: ['value'],
    parameters: [
      {
        id: 'period',
        name: 'Period',
        type: 'number',
        description: 'Number of periods to calculate the moving average',
        defaultValue: 20,
        min: 2,
        max: 200,
        step: 1,
        required: true
      },
      {
        id: 'type',
        name: 'Type',
        type: 'select',
        description: 'Type of moving average',
        defaultValue: 'sma',
        options: [
          { label: 'Simple (SMA)', value: 'sma' },
          { label: 'Exponential (EMA)', value: 'ema' }
        ],
        required: true
      }
    ]
  },
  
  // Buy Signals
  {
    type: 'buy-signal',
    name: 'Buy Signal',
    icon: 'fas fa-shopping-cart text-green-500',
    bgColor: 'bg-green-500/30',
    description: 'Generates a buy signal when input conditions are met',
    inputs: ['condition'],
    outputs: ['action'],
    parameters: [
      {
        id: 'amount',
        name: 'Purchase Amount',
        type: 'number',
        description: 'Amount to buy, as a percentage of available funds',
        defaultValue: 100,
        min: 1,
        max: 100,
        step: 1,
        required: true
      },
      {
        id: 'takeProfit',
        name: 'Take Profit (%)',
        type: 'number',
        description: 'Percentage gain at which to take profit',
        defaultValue: 5,
        min: 0.1,
        max: 100,
        step: 0.1,
        required: false
      }
    ]
  },
  
  // Sell Signals
  {
    type: 'sell-signal',
    name: 'Sell Signal',
    icon: 'fas fa-sign-out-alt text-red-500',
    bgColor: 'bg-red-500/30',
    description: 'Generates a sell signal when input conditions are met',
    inputs: ['condition'],
    outputs: ['action'],
    parameters: [
      {
        id: 'amount',
        name: 'Sell Amount',
        type: 'number',
        description: 'Amount to sell, as a percentage of held assets',
        defaultValue: 100,
        min: 1,
        max: 100,
        step: 1,
        required: true
      },
      {
        id: 'stopLoss',
        name: 'Stop Loss (%)',
        type: 'number',
        description: 'Percentage loss at which to cut losses',
        defaultValue: 3,
        min: 0.1,
        max: 100,
        step: 0.1,
        required: false
      }
    ]
  },
  
  // Filters
  {
    type: 'filter',
    name: 'Volume Filter',
    icon: 'fas fa-filter text-yellow-500',
    bgColor: 'bg-yellow-500/30',
    description: 'Filters signals based on trading volume thresholds',
    inputs: ['signal'],
    outputs: ['filtered'],
    parameters: [
      {
        id: 'minVolume',
        name: 'Minimum Volume',
        type: 'number',
        description: 'Minimum volume required to pass the filter',
        defaultValue: 100000,
        min: 0,
        max: 10000000,
        step: 10000,
        required: true
      },
      {
        id: 'volumeMultiplier',
        name: 'Volume Multiplier',
        type: 'number',
        description: 'Volume must be this multiple of the average',
        defaultValue: 1.5,
        min: 1,
        max: 10,
        step: 0.1,
        required: false
      }
    ]
  },
  
  // Logic
  {
    type: 'logic',
    name: 'AND Logic',
    icon: 'fas fa-robot text-neutral-400',
    bgColor: 'bg-neutral-700',
    description: 'Returns true only if all inputs are true',
    inputs: ['input1', 'input2'],
    outputs: ['result'],
    parameters: []
  },
  {
    type: 'logic',
    name: 'OR Logic',
    icon: 'fas fa-code-branch text-neutral-400',
    bgColor: 'bg-neutral-700',
    description: 'Returns true if any input is true',
    inputs: ['input1', 'input2'],
    outputs: ['result'],
    parameters: []
  }
];

// Helper functions to work with component definitions
export function getComponentDefinition(type: string, name: string): StrategyComponentDefinition | undefined {
  return COMPONENT_DEFINITIONS.find(def => def.type === type && def.name === name);
}

export function getDefaultParameters(type: string, name: string): Record<string, any> {
  const definition = getComponentDefinition(type, name);
  if (!definition) return {};
  
  // Create default parameters object
  return definition.parameters.reduce((params, param) => {
    params[param.id] = param.defaultValue;
    return params;
  }, {} as Record<string, any>);
}

export function validateComponentConnection(fromType: string, toType: string): boolean {
  // Simple validation rules
  if (fromType === 'buy-signal' || fromType === 'sell-signal') {
    return false; // These are typically endpoints and don't connect to other components
  }
  
  // Indicators can connect to filters, buy/sell signals, and logic gates
  if (fromType === 'indicator') {
    return ['filter', 'buy-signal', 'sell-signal', 'logic'].includes(toType);
  }
  
  // Filters typically connect to buy/sell signals or logic gates
  if (fromType === 'filter') {
    return ['buy-signal', 'sell-signal', 'logic'].includes(toType);
  }
  
  // Logic gates can connect to buy/sell signals or other logic gates
  if (fromType === 'logic') {
    return ['buy-signal', 'sell-signal', 'logic'].includes(toType);
  }
  
  return true; // Default to allowing connections
}