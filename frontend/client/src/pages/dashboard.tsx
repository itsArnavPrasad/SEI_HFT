import React, { useState, useEffect } from 'react';
import { SummaryCard } from '@/components/ui/summary-card';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { StrategiesTable } from '@/components/dashboard/strategies-table';
import { MarketOverview } from '@/components/dashboard/market-overview';
import { MarketDetails } from '@/components/dashboard/market-details';
import { LearningProgress } from '@/components/dashboard/learning-progress';
import { QuickBuilder } from '@/components/strategy-builder/quick-builder';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { SummaryCardData, StrategyData, MarketData, ArbitrageOpportunity, ChartData, LearningResourceData } from '@/lib/types';

export default function Dashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  
  // Auto-refresh market data every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshMarketData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const refreshMarketData = async () => {
    // In a production app, this would fetch from an API
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleMarketSelect = (market: MarketData) => {
    setSelectedMarket(market);
  };
  
  const handleArbitrageSelect = (opportunity: ArbitrageOpportunity) => {
    // Find the corresponding market data
    const marketData = markets.find(market => market.symbol === opportunity.symbol);
    if (marketData) {
      setSelectedMarket(marketData);
    } else {
      toast({
        title: "Market data not available",
        description: `Detailed view for ${opportunity.symbol} is not available right now.`,
        variant: "destructive"
      });
    }
  };
  
  const handleCreateStrategy = () => {
    setLocation('/strategy-builder');
  };

  // Summary cards data
  const summaryCards: SummaryCardData[] = [
    {
      title: 'Total Value',
      value: '$24,568.80',
      change: '+5.27%',
      isPositive: true,
      icon: 'fas fa-wallet',
      iconBg: 'bg-primary-dark/30',
    },
    {
      title: 'Active Strategies',
      value: '3',
      status: 'All Running',
      icon: 'fas fa-robot',
      iconBg: 'bg-green-500/30',
    },
    {
      title: '24h Profit/Loss',
      value: '+$347.25',
      change: '+1.43%',
      isPositive: true,
      icon: 'fas fa-chart-line',
      iconBg: 'bg-green-500/30',
    },
    {
      title: 'SEI Network',
      value: '390ms',
      status: 'Optimal',
      icon: 'fas fa-network-wired',
      iconBg: 'bg-primary-dark/30',
    }
  ];

  // Chart data
  const performanceData: ChartData[] = [
    { date: 'Jun 1', value: 23500 },
    { date: 'Jun 2', value: 23650 },
    { date: 'Jun 3', value: 24100 },
    { date: 'Jun 4', value: 23900 },
    { date: 'Jun 5', value: 24200 },
    { date: 'Jun 6', value: 24400 },
    { date: 'Jun 7', value: 24650 },
  ];

  // Strategies data
  const strategies: StrategyData[] = [
    {
      id: '1',
      name: 'BTC Momentum',
      type: 'momentum',
      icon: 'fas fa-chart-line',
      iconBg: 'bg-primary-dark/30',
      createdDate: '12 days ago',
      assets: {
        symbols: ['BTC'],
        pair: 'BTC/USDT',
      },
      value: '$12,245.32',
      profitLoss: {
        value: '+$187.56',
        percentage: '1.53%',
        isPositive: true,
      },
      trades: 24,
      status: 'active',
    },
    {
      id: '2',
      name: 'ETH-SOL Arbitrage',
      type: 'arbitrage',
      icon: 'fas fa-exchange-alt',
      iconBg: 'bg-yellow-500/30',
      createdDate: '5 days ago',
      assets: {
        symbols: ['ETH', 'SOL'],
        pair: 'Multiple',
      },
      value: '$8,654.75',
      profitLoss: {
        value: '+$145.32',
        percentage: '1.68%',
        isPositive: true,
      },
      trades: 37,
      status: 'monitoring',
    },
    {
      id: '3',
      name: 'SEI Market Making',
      type: 'market-making',
      icon: 'fas fa-coins',
      iconBg: 'bg-red-500/30',
      createdDate: '2 days ago',
      assets: {
        symbols: ['SEI'],
        pair: 'SEI/USDC',
      },
      value: '$3,668.73',
      profitLoss: {
        value: '-$32.45',
        percentage: '0.88%',
        isPositive: false,
      },
      trades: 52,
      status: 'underperforming',
    },
  ];

  // Markets data
  const markets: MarketData[] = [
    {
      symbol: 'BTC/USDT',
      name: 'Bitcoin',
      price: '$65,432.78',
      change: '+2.34%',
      isPositive: true,
      iconSymbol: '₿',
      iconColor: 'yellow',
    },
    {
      symbol: 'ETH/USDT',
      name: 'Ethereum',
      price: '$3,456.82',
      change: '+1.87%',
      isPositive: true,
      iconSymbol: 'Ξ',
      iconColor: 'blue',
    },
    {
      symbol: 'SEI/USDC',
      name: 'SEI Network',
      price: '$0.8432',
      change: '-0.75%',
      isPositive: false,
      iconSymbol: 'S',
      iconColor: 'green',
    },
    {
      symbol: 'SOL/USDT',
      name: 'Solana',
      price: '$145.23',
      change: '+3.15%',
      isPositive: true,
      iconSymbol: 'S',
      iconColor: 'purple',
    },
  ];

  // Arbitrage opportunities data
  const arbitrageOpportunities: ArbitrageOpportunity[] = [
    {
      symbol: 'BTC/USDT',
      name: 'Bitcoin',
      percentage: '0.32%',
      route: 'DragonSwap → AstroX',
      volume: 'Vol: $2.4M',
      iconSymbol: '₿',
      iconColor: 'yellow',
    },
    {
      symbol: 'ETH/USDC',
      name: 'Ethereum',
      percentage: '0.54%',
      route: 'SaturnDEX → DragonSwap',
      volume: 'Vol: $1.2M',
      iconSymbol: 'Ξ',
      iconColor: 'blue',
    },
    {
      symbol: 'SEI/USDT',
      name: 'SEI Network',
      percentage: '0.87%',
      route: 'AstroX → NovaDEX',
      volume: 'Vol: $520K',
      iconSymbol: 'S',
      iconColor: 'green',
    },
    {
      symbol: 'SOL/USDC',
      name: 'Solana',
      percentage: '0.25%',
      route: 'SaturnDEX → NovaDEX',
      volume: 'Vol: $980K',
      iconSymbol: 'S',
      iconColor: 'purple',
    },
  ];

  // Learning resources data
  const learningResources: LearningResourceData[] = [
    {
      id: '1',
      title: 'HFT Fundamentals',
      description: 'Learn the basics of high-frequency trading and key strategies.',
      icon: 'fas fa-graduation-cap',
      iconBg: 'bg-primary-dark',
      status: 'completed',
      progress: 100,
    },
    {
      id: '2',
      title: 'Arbitrage Strategies',
      description: 'Discover how to identify and execute arbitrage opportunities.',
      icon: 'fas fa-exchange-alt',
      iconBg: 'bg-primary-dark',
      status: 'completed',
      progress: 100,
    },
    {
      id: '3',
      title: 'Building with SEI',
      description: 'Learn how to leverage SEI blockchain for HFT strategies.',
      icon: 'fas fa-robot',
      iconBg: 'bg-secondary-dark',
      status: 'in-progress',
      progress: 65,
    },
    {
      id: '4',
      title: 'Advanced Technical Analysis',
      description: 'Master technical indicators for better trading decisions.',
      icon: 'fas fa-chart-area',
      iconBg: 'bg-neutral-700',
      status: 'locked',
      progress: 0,
    },
    {
      id: '5',
      title: 'AI in Algorithmic Trading',
      description: 'Explore AI and ML applications in trading strategies.',
      icon: 'fas fa-brain',
      iconBg: 'bg-neutral-700',
      status: 'locked',
      progress: 0,
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Overview of your trading strategies and performance
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant="outline"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white"
            onClick={refreshMarketData}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                Syncing...
              </>
            ) : (
              <>
                <i className="fas fa-sync-alt mr-2"></i>
                Refresh
              </>
            )}
          </Button>
          <Button 
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white"
            onClick={handleCreateStrategy}
          >
            <i className="fas fa-plus mr-2"></i>
            New Strategy
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card, index) => (
          <SummaryCard key={index} data={card} />
        ))}
      </div>

      {/* Performance Chart & Strategies Table */}
      <PerformanceChart 
        data={performanceData}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg mb-6">
        <StrategiesTable strategies={strategies} />
      </div>

      {/* Two Column Layout: Market Overview + Recent News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MarketOverview 
          markets={markets}
          arbitrageOpportunities={arbitrageOpportunities}
          onMarketSelect={handleMarketSelect}
          onOpportunitySelect={handleArbitrageSelect}
          isLoading={isLoading}
        />
        
        <LearningProgress 
          resources={learningResources}
          completedCount={2}
          totalCount={5}
        />
      </div>

      {/* Quick Strategy Builder */}
      <QuickBuilder />
      
      {/* Market Details Modal */}
      {selectedMarket && (
        <MarketDetails 
          marketData={selectedMarket} 
          onClose={() => setSelectedMarket(null)} 
        />
      )}
    </div>
  );
}
