import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketData } from '@/lib/types';
import { XCircle } from 'lucide-react';

// Define the additional data for market details display
interface MarketDetailData {
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  volume24h: string;
  high24h: string;
  low24h: string;
  marketCap: string;
  supply: string;
  allTimeHigh: string;
  allTimeHighDate: string;
  description: string;
  logoUrl?: string;
  isPositive: boolean;
  priceData: {
    time: string;
    price: number;
  }[];
  orderBook: {
    bids: { price: string; amount: string }[];
    asks: { price: string; amount: string }[];
  };
  recentTrades: {
    time: string;
    price: string;
    amount: string;
    side: 'buy' | 'sell';
  }[];
}

interface MarketDetailsProps {
  marketData: MarketData;
  onClose: () => void;
}

export function MarketDetails({ marketData, onClose }: MarketDetailsProps) {
  // In a production app, this would fetch from an API
  const detailData: MarketDetailData = {
    symbol: marketData.symbol,
    name: marketData.name,
    price: marketData.price,
    change24h: marketData.change,
    isPositive: marketData.isPositive,
    volume24h: '$3.2B',
    high24h: marketData.isPositive 
      ? (parseFloat(marketData.price.replace(/[^0-9.]/g, '')) * 1.05).toFixed(2)
      : marketData.price,
    low24h: marketData.isPositive 
      ? marketData.price
      : (parseFloat(marketData.price.replace(/[^0-9.]/g, '')) * 0.95).toFixed(2),
    marketCap: '$1.2T',
    supply: '19.4M',
    allTimeHigh: '$69,000',
    allTimeHighDate: 'Nov 10, 2021',
    description: `${marketData.name} is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer network without the need for intermediaries.`,
    priceData: [
      { time: '00:00', price: 64500 },
      { time: '04:00', price: 64800 },
      { time: '08:00', price: 65100 },
      { time: '12:00', price: 65300 },
      { time: '16:00', price: 65100 },
      { time: '20:00', price: 65400 },
      { time: 'Now', price: parseFloat(marketData.price.replace(/[^0-9.]/g, '')) },
    ],
    orderBook: {
      bids: [
        { price: '$65,430.50', amount: '0.42' },
        { price: '$65,429.75', amount: '0.81' },
        { price: '$65,428.00', amount: '1.25' },
        { price: '$65,427.50', amount: '0.53' },
        { price: '$65,425.00', amount: '2.10' },
      ],
      asks: [
        { price: '$65,432.50', amount: '0.38' },
        { price: '$65,434.25', amount: '0.67' },
        { price: '$65,435.75', amount: '1.15' },
        { price: '$65,437.00', amount: '0.91' },
        { price: '$65,440.00', amount: '1.52' },
      ],
    },
    recentTrades: [
      { time: '10:15:32', price: '$65,432.50', amount: '0.12', side: 'buy' },
      { time: '10:14:27', price: '$65,433.75', amount: '0.08', side: 'sell' },
      { time: '10:13:45', price: '$65,432.00', amount: '0.25', side: 'buy' },
      { time: '10:12:19', price: '$65,434.50', amount: '0.15', side: 'sell' },
      { time: '10:11:03', price: '$65,431.25', amount: '0.10', side: 'buy' },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-xl border border-neutral-700 w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-${marketData.iconColor}-500 flex items-center justify-center text-lg font-bold text-neutral-900`}>
              {marketData.iconSymbol}
            </div>
            <div className="ml-3">
              <h2 className="text-xl font-bold text-white">{marketData.symbol}</h2>
              <p className="text-sm text-neutral-400">{marketData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-lg font-bold text-white">{marketData.price}</div>
              <div className={`text-sm ${marketData.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {marketData.change}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <XCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-60px)]">
          <Tabs defaultValue="overview">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="orderbook">Order Book</TabsTrigger>
              <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card className="border-neutral-700 bg-neutral-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Market Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">Price</p>
                          <p className="text-sm font-medium text-white">{detailData.price}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">24h Change</p>
                          <p className={`text-sm font-medium ${detailData.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {detailData.change24h}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">24h High</p>
                          <p className="text-sm font-medium text-white">${detailData.high24h}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">24h Low</p>
                          <p className="text-sm font-medium text-white">${detailData.low24h}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">24h Volume</p>
                          <p className="text-sm font-medium text-white">{detailData.volume24h}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">Market Cap</p>
                          <p className="text-sm font-medium text-white">{detailData.marketCap}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">Supply</p>
                          <p className="text-sm font-medium text-white">{detailData.supply}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-neutral-400">All Time High</p>
                          <p className="text-sm font-medium text-white">{detailData.allTimeHigh}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="border-neutral-700 bg-neutral-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">About {detailData.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {detailData.description}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                          <i className="fas fa-plus mr-2"></i>
                          Create Strategy
                        </Button>
                        <Button className="w-full">
                          <i className="fas fa-exchange-alt mr-2"></i>
                          Trade
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chart" className="m-0">
              <Card className="border-neutral-700 bg-neutral-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Price Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border border-dashed border-neutral-700 rounded-lg">
                    <div className="text-center">
                      <i className="fas fa-chart-line text-4xl text-neutral-500 mb-2"></i>
                      <p className="text-neutral-400">Interactive price chart would be displayed here</p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Powered by TradingView or a custom charting library
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center space-x-2">
                    {['1H', '4H', '1D', '1W', '1M', 'All'].map((timeframe) => (
                      <Button key={timeframe} variant="outline" size="sm">
                        {timeframe}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orderbook" className="m-0">
              <Card className="border-neutral-700 bg-neutral-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Order Book</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-500 mb-2">Bids</h4>
                      <div className="space-y-1">
                        {detailData.orderBook.bids.map((bid, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-green-500">{bid.price}</span>
                            <span className="text-neutral-300">{bid.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-red-500 mb-2">Asks</h4>
                      <div className="space-y-1">
                        {detailData.orderBook.asks.map((ask, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-red-500">{ask.price}</span>
                            <span className="text-neutral-300">{ask.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trades" className="m-0">
              <Card className="border-neutral-700 bg-neutral-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {detailData.recentTrades.map((trade, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-700 text-sm">
                        <span className="text-neutral-400">{trade.time}</span>
                        <span className={trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}>
                          {trade.price}
                        </span>
                        <span className="text-neutral-300">{trade.amount}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trade.side === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {trade.side === 'buy' ? 'BUY' : 'SELL'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="p-4 border-t border-neutral-700 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <i className="fas fa-star mr-2"></i>
              Add to Watchlist
            </Button>
            <Button>
              <i className="fas fa-exchange-alt mr-2"></i>
              Trade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}