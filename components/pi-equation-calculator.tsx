'use client'

import { Info } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const PIEquationCalculator: React.FC = () => {
  const [salesVolume, setSalesVolume] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [churn, setChurn] = useState<number | ''>('');
  const [currentRevenue, setCurrentRevenue] = useState<number | ''>('');
  const [hypotheticalMax, setHypotheticalMax] = useState<number | null>(null);
  const [lifetimeValue, setLifetimeValue] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setSalesVolume(Math.floor(Math.random() * 1000) + 100);
      setPrice(Math.floor(Math.random() * 100) + 10);
      setChurn(Math.floor(Math.random() * 10) + 1);
      setCurrentRevenue(Math.floor(Math.random() * 100000) + 10000);
    }
  }, []);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | ''>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseFloat(value)) && isFinite(Number(value)))) {
      setter(value === '' ? '' : parseFloat(value));
    }
  };

  const calculateResults = () => {
    if (typeof salesVolume === 'number' && typeof price === 'number' && typeof churn === 'number') {
      if (churn === 0) {
        toast({
          title: "Error",
          description: "Churn rate cannot be zero.",
          variant: "destructive",
        });
        return;
      }
      const max = (salesVolume * price) / (churn / 100);
      setHypotheticalMax(max);
      
      // Calculate Lifetime Value
      const ltv = price / (churn / 100);
      setLifetimeValue(ltv);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive",
      });
    }
  };

  const getComparisonMessage = () => {
    if (hypotheticalMax === null || typeof currentRevenue !== 'number') return '';
    if (hypotheticalMax < currentRevenue) {
      return "Your business is on track to shrink down to the hypothetical max.";
    } else if (hypotheticalMax === currentRevenue) {
      return "Your business is breaking even.";
    } else {
      const growthFactor = hypotheticalMax / currentRevenue;
      return `Your business has the potential to grow by ${growthFactor.toFixed(2)} times.`;
    }
  };

  const generateChartData = () => {
    if (hypotheticalMax === null || typeof currentRevenue !== 'number') return [];
    const steps = 100;
    const data = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Custom S-curve function
      const revenue = currentRevenue + (hypotheticalMax - currentRevenue) * (1 / (1 + Math.exp(-12 * (t - 0.5))));
      data.push({
        step: i,
        revenue: Math.round(revenue),
      });
    }
    return data;
  };

  const chartData = generateChartData();

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.step === 0 || payload.step === 100) {
      const color = payload.step === 0 ? "#4EB9F3" : "#009E5D"; // New blue for start, Green for end
      return (
        <circle cx={cx} cy={cy} r={6} fill={color} />
      );
    }
    return null;
  };

  const radialChartData = [
    {
      name: 'Current Revenue',
      value: currentRevenue as number,
      fill: '#4EB9F3'
    },
    {
      name: 'Hypothetical Max',
      value: hypotheticalMax as number,
      fill: '#009E5D'
    }
  ];

  const chartConfig = {
    currentRevenue: {
      color: '#4EB9F3',
      label: 'Current Revenue',
    },
    hypotheticalMax: {
      color: '#009E5D',
      label: 'Hypothetical Max',
    },
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>The PIE Equation Calculator</CardTitle>
          <CardDescription>
            Calculate Your Hypothetical Max Revenue 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <div className="flex items-center space-x-2">
                <Label htmlFor="salesVolume">Sales Volume Monthly</Label>
                <Popover>
                  <PopoverTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    The number of new customers you acquire each month.
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                type="number"
                id="salesVolume"
                value={salesVolume}
                onChange={handleInputChange(setSalesVolume)}
                placeholder="Enter sales volume"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <div className="flex items-center space-x-2">
                <Label htmlFor="price">Price Monthly</Label>
                <Popover>
                  <PopoverTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    The monthly price of your product or service.
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={handleInputChange(setPrice)}
                placeholder="Enter price"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <div className="flex items-center space-x-2">
                <Label htmlFor="churn">Churn Monthly (%)</Label>
                <Popover>
                  <PopoverTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    The percentage of customers who cancel or don't renew their subscription each month.
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                type="number"
                id="churn"
                value={churn}
                onChange={handleInputChange(setChurn)}
                placeholder="Enter churn rate"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <div className="flex items-center space-x-2">
                <Label htmlFor="currentRevenue">Current Revenue Monthly</Label>
                <Popover>
                  <PopoverTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Your current monthly revenue.
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                type="number"
                id="currentRevenue"
                value={currentRevenue}
                onChange={handleInputChange(setCurrentRevenue)}
                placeholder="Enter current revenue"
              />
            </div>
            <Button onClick={calculateResults}>Calculate</Button>
          </div>
        </CardContent>
      </Card>

      {hypotheticalMax !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Hypothetical Max Revenue: ${formatNumber(hypotheticalMax)}</p>
              <div className="text-sm text-muted-foreground">
                <p>Calculation:</p>
                <p>Hypothetical Max = Sales Volume * (Price / Churn)</p>
                <p>= {salesVolume.toLocaleString()} * (${formatNumber(price as number)} / {churn}%)</p>
                <p>= ${formatNumber(hypotheticalMax)}</p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="step"
                      tickFormatter={() => ''}
                      axisLine={{ stroke: 'var(--muted-foreground)' }}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      axisLine={{ stroke: 'var(--muted-foreground)' }}
                      tickLine={false}
                      width={80}
                      tickCount={5}
                      domain={['auto', 'auto']}
                      padding={{ top: 20, bottom: 20 }}
                    />
                    <Tooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                      labelFormatter={() => ''}
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--foreground)'
                      }}
                    />
                    <Legend 
                      payload={[
                        { value: 'Current Revenue', type: 'circle', color: '#4EB9F3' },
                        { value: 'Hypothetical Max', type: 'circle', color: '#009E5D' },
                        { value: 'Revenue Growth', type: 'line', color: '#F8D481' }
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F8D481"
                      strokeWidth={2}
                      dot={<CustomDot />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-2 font-medium leading-none">
                {hypotheticalMax > (currentRevenue as number) ? (
                  <>
                    Potential growth: {((hypotheticalMax / (currentRevenue as number) - 1) * 100).toFixed(2)}%
                    <TrendingUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Potential shrinkage: {((1 - hypotheticalMax / (currentRevenue as number)) * 100).toFixed(2)}%
                    <TrendingDown className="h-4 w-4" />
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {getComparisonMessage()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {lifetimeValue !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Customer Lifetime Value: ${formatNumber(lifetimeValue)}</p>
            <div className="text-sm text-muted-foreground mt-2">
              <p>This is the average revenue you can expect from a customer over their entire relationship with your business.</p>
              <p className="mt-2">Calculation:</p>
              <p>Lifetime Value = Price / Churn</p>
              <p>= ${formatNumber(price as number)} / {churn}%</p>
              <p>= ${formatNumber(lifetimeValue)}</p>
            </div>
          </CardContent>
        </Card>
      )}


    </div>
  );
};

export default PIEquationCalculator;