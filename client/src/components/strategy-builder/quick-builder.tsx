import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export function QuickBuilder() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    strategyName: '',
    strategyType: 'trend',
    asset: 'BTC/USDT',
    timeframe: '1h',
    indicatorType: 'rsi',
    rsiPeriod: 14,
    macdFast: 12,
    macdSlow: 26,
    macdSignal: 9,
    movingAveragePeriod: 20,
    movingAverageType: 'sma',
    takeProfit: 5,
    stopLoss: 3,
    trailingStop: false,
    trailingAmount: 1.5,
    backtest: true,
    notification: true,
  });

  const handleChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Validate current step
    if (step === 1 && !data.strategyName) {
      toast({
        title: "Missing information",
        description: "Please provide a strategy name",
        variant: "destructive"
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleCreate = () => {
    // Here we would normally send the data to the server
    // For now, we'll just show a success message
    toast({
      title: "Strategy created",
      description: `${data.strategyName} has been created successfully!`,
    });
    
    // Reset form
    setStep(1);
    setData({
      strategyName: '',
      strategyType: 'trend',
      asset: 'BTC/USDT',
      timeframe: '1h',
      indicatorType: 'rsi',
      rsiPeriod: 14,
      macdFast: 12,
      macdSlow: 26,
      macdSignal: 9,
      movingAveragePeriod: 20,
      movingAverageType: 'sma',
      takeProfit: 5,
      stopLoss: 3,
      trailingStop: false,
      trailingAmount: 1.5,
      backtest: true,
      notification: true,
    });
  };

  return (
    <Card className="w-full max-w-lg border-neutral-800 bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Quick Strategy Builder</CardTitle>
        <CardDescription>Create a trading strategy in a few steps</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="strategyName">Strategy Name</Label>
              <Input
                id="strategyName"
                placeholder="My Trading Strategy"
                value={data.strategyName}
                onChange={(e) => handleChange('strategyName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Strategy Type</Label>
              <RadioGroup 
                value={data.strategyType} 
                onValueChange={(value) => handleChange('strategyType', value)}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trend" id="trend" />
                  <Label htmlFor="trend">Trend Following</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reversal" id="reversal" />
                  <Label htmlFor="reversal">Reversal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="breakout" id="breakout" />
                  <Label htmlFor="breakout">Breakout</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Asset</Label>
                <Select 
                  value={data.asset} 
                  onValueChange={(value) => handleChange('asset', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                    <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                    <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                    <SelectItem value="SEI/USDT">SEI/USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Timeframe</Label>
                <Select 
                  value={data.timeframe} 
                  onValueChange={(value) => handleChange('timeframe', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 minute</SelectItem>
                    <SelectItem value="5m">5 minutes</SelectItem>
                    <SelectItem value="15m">15 minutes</SelectItem>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="1d">1 day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Indicator</Label>
              <Select 
                value={data.indicatorType} 
                onValueChange={(value) => handleChange('indicatorType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select indicator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rsi">RSI (Relative Strength Index)</SelectItem>
                  <SelectItem value="macd">MACD (Moving Average Convergence Divergence)</SelectItem>
                  <SelectItem value="ma">Moving Average Crossover</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator className="my-4" />
            
            {data.indicatorType === 'rsi' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>RSI Period: {data.rsiPeriod}</Label>
                  </div>
                  <Slider
                    value={[data.rsiPeriod]}
                    min={2}
                    max={30}
                    step={1}
                    onValueChange={(value) => handleChange('rsiPeriod', value[0])}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Overbought Level</Label>
                    <Input
                      type="number"
                      value={70}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Oversold Level</Label>
                    <Input
                      type="number"
                      value={30}
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
            
            {data.indicatorType === 'macd' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Fast Period</Label>
                    <Input
                      type="number"
                      value={data.macdFast}
                      onChange={(e) => handleChange('macdFast', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slow Period</Label>
                    <Input
                      type="number"
                      value={data.macdSlow}
                      onChange={(e) => handleChange('macdSlow', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Signal Period</Label>
                    <Input
                      type="number"
                      value={data.macdSignal}
                      onChange={(e) => handleChange('macdSignal', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {data.indicatorType === 'ma' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Period: {data.movingAveragePeriod}</Label>
                  </div>
                  <Slider
                    value={[data.movingAveragePeriod]}
                    min={5}
                    max={200}
                    step={1}
                    onValueChange={(value) => handleChange('movingAveragePeriod', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Moving Average Type</Label>
                  <RadioGroup 
                    value={data.movingAverageType} 
                    onValueChange={(value) => handleChange('movingAverageType', value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sma" id="sma" />
                      <Label htmlFor="sma">Simple (SMA)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ema" id="ema" />
                      <Label htmlFor="ema">Exponential (EMA)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Take Profit: {data.takeProfit}%</Label>
              </div>
              <Slider
                value={[data.takeProfit]}
                min={0.5}
                max={20}
                step={0.5}
                onValueChange={(value) => handleChange('takeProfit', value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Stop Loss: {data.stopLoss}%</Label>
              </div>
              <Slider
                value={[data.stopLoss]}
                min={0.5}
                max={15}
                step={0.5}
                onValueChange={(value) => handleChange('stopLoss', value[0])}
              />
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch 
                checked={data.trailingStop}
                onCheckedChange={(checked) => handleChange('trailingStop', checked)}
              />
              <Label>Enable Trailing Stop</Label>
            </div>
            
            {data.trailingStop && (
              <div className="space-y-2 pl-6">
                <div className="flex justify-between items-center">
                  <Label>Trailing Amount: {data.trailingAmount}%</Label>
                </div>
                <Slider
                  value={[data.trailingAmount]}
                  min={0.5}
                  max={5}
                  step={0.1}
                  onValueChange={(value) => handleChange('trailingAmount', value[0])}
                />
              </div>
            )}
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={data.backtest}
                  onCheckedChange={(checked) => handleChange('backtest', checked)}
                />
                <Label>Run backtest after creation</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={data.notification}
                  onCheckedChange={(checked) => handleChange('notification', checked)}
                />
                <Label>Enable trade notifications</Label>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < 3 ? (
          <Button onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button onClick={handleCreate}>
            Create Strategy
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}