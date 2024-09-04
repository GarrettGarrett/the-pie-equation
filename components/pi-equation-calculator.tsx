"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import { Calculator, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import CongratulationMessage from "./congrats-message"
import { ShrinkingRevenueCard } from "./shrinking-revenue-card"
import NeutralMaxRevenueCard from "./neutral-card"
import { cn } from "@/lib/utils"

interface PiEquationCalculatorProps {
  onCalculate: (current: number, max: number, triggerConfetti: () => void) => void;
}

export default function PiEquationCalculator({ onCalculate }: PiEquationCalculatorProps) {
  const [salesVolume, setSalesVolume] = useState("")
  const [price, setPrice] = useState("")
  const [churn, setChurn] = useState("")
  const [currentRevenue, setCurrentRevenue] = useState("")
  const [hypotheticalMax, setHypotheticalMax] = useState<number | null>(null)
  const [growthPotential, setGrowthPotential] = useState<number | null>(null)
  const [breakEvenChurn, setBreakEvenChurn] = useState<number | null>(null)
  const [breakEvenSalesVolume, setBreakEvenSalesVolume] = useState<number | null>(null)
  const [requiredChurn, setRequiredChurn] = useState<number | null>(null)
  const [requiredSalesVolume, setRequiredSalesVolume] = useState<number | null>(null)
  const [shrinkFactor, setShrinkFactor] = useState<number | null>(null);
  const [shrinkPercentage, setShrinkPercentage] = useState<number | null>(null);
  const [timeToMax, setTimeToMax] = useState<number | null>(null);

  const normalizeChurnRate = (value: string): number => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return NaN;
    if (parsed >= 1) {
      return parsed / 100; // Treat as percentage
    } else {
      return parsed; // Already in decimal form
    }
  }

  const handleCalculate = useCallback((current: number, max: number) => {
    onCalculate(current, max, () => {
      console.log("Triggering confetti!");
    });
  }, [onCalculate])

  const calculateBreakEvenChurn = (sv: number, p: number, cr: number): number => {
    return p * sv / cr
  }

  const calculateBreakEvenSalesVolume = (c: number, p: number, cr: number): number => {
    return (c * cr) / p;
  }

  const calculatePiEquation = () => {
    const sv = parseFloat(salesVolume);
    const p = parseFloat(price);
    let c = normalizeChurnRate(churn);
    const cr = parseFloat(currentRevenue);

    if (isNaN(sv) || isNaN(p) || isNaN(c) || isNaN(cr)) {
      onCalculate(0, 0, () => {}); // Pass an empty function when not triggering confetti
      setHypotheticalMax(null);
      setGrowthPotential(null);
      setBreakEvenChurn(null);
      setBreakEvenSalesVolume(null);
      return;
    }

    // Treat zero churn as 0.0001 (0.01%)
    if (c === 0) {
      c = 0.0001;
    }

    const lifetimeValue = p / c;
    const calculatedMaxRevenue = sv * lifetimeValue;
    const calculatedResult = sv * p / (c * cr);

    const growthFactor = calculatedMaxRevenue / cr;
    setGrowthPotential(growthFactor);
    handleCalculate(cr, calculatedMaxRevenue);
    setHypotheticalMax(calculatedMaxRevenue);

    // Calculate break-even values
    const breakEvenChurnValue = calculateBreakEvenChurn(sv, p, cr);
    setBreakEvenChurn(breakEvenChurnValue);

    if (calculatedMaxRevenue < cr) {
      const shrinkFactorValue = calculatedMaxRevenue / cr;
      setShrinkFactor(shrinkFactorValue);
      setShrinkPercentage((1 - shrinkFactorValue) * 100);
      
      const breakEvenSalesVolumeValue = calculateBreakEvenSalesVolume(c, p, cr);
      setBreakEvenSalesVolume(Math.ceil(breakEvenSalesVolumeValue));

      // Calculate required churn and sales volume for $1000 above current revenue
      const requiredChurnValue = calculateRequiredChurn(sv, p, cr);
      setRequiredChurn(requiredChurnValue);

      const requiredSalesVolumeValue = calculateRequiredSalesVolume(c, p, cr);
      setRequiredSalesVolume(Math.ceil(requiredSalesVolumeValue));
    } else {
      setBreakEvenSalesVolume(null);
      setRequiredChurn(null);
      setRequiredSalesVolume(null);
      setShrinkFactor(null);
      setShrinkPercentage(null);
    }

    // Calculate time to reach max revenue
    const timeToMaxMonths = calculateTimeToMax(cr, calculatedMaxRevenue, sv, c);
    setTimeToMax(timeToMaxMonths);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculatePiEquation()
    
    // Scroll to the results after a short delay to ensure the results have rendered
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleChurnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChurn(e.target.value);
  }

  const calculateRequiredChurn = useMemo(() => (sv: number, p: number, cr: number): number => {
    const targetMax = cr + 1000;
    return p * sv / targetMax;
  }, [])

  const calculateRequiredSalesVolume = useMemo(() => (c: number, p: number, cr: number): number => {
    const targetMax = cr + 1000;
    return (c * targetMax) / p;
  }, [])

  const calculateTimeToMax = (current: number, max: number, sv: number, c: number): number => {
    if (max > current) {
      // Growing scenario
      const monthlyGrowth = sv - (current * c);
      return Math.ceil((max - current) / monthlyGrowth);
    } else {
      // Shrinking scenario
      return Math.ceil(Math.log(max / current) / Math.log(1 - c));
    }
  }

  const resultRef = useRef<HTMLDivElement>(null)

  const InputWithLargerFont = ({ className, ...props }: React.ComponentProps<typeof Input>) => (
    <Input
      className={cn("text-base md:text-lg", className)}
      {...props}
    />
  )

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">Pie Equation Calculator</CardTitle>
            <p className="text-sm text-center text-muted-foreground">For Membership Businesses</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salesVolume" className="flex items-center">
                  Sales Volume Monthly
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto ml-2">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Sales Volume Info</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      The number of new customers acquired per month.
                    </PopoverContent>
                  </Popover>
                </Label>
                <InputWithLargerFont
                  id="salesVolume"
                  placeholder="Enter sales volume"
                  value={salesVolume}
                  onChange={(e) => setSalesVolume(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center">
                  Price Monthly
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto ml-2">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Price Info</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      The monthly subscription price or average revenue per user.
                    </PopoverContent>
                  </Popover>
                </Label>
                <InputWithLargerFont
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="churn" className="flex items-center">
                  Churn Monthly (% or decimal)
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto ml-2">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Churn Info</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      If you had 100 customers last month and 13 left, then churn is 13%
                    </PopoverContent>
                  </Popover>
                </Label>
                <InputWithLargerFont
                  id="churn"
                  placeholder="Enter churn rate "
                  value={churn}
                  onChange={handleChurnChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentRevenue" className="flex items-center">
                  Current Revenue Monthly
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto ml-2">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Current Revenue Info</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      Your current monthly recurring revenue.
                    </PopoverContent>
                  </Popover>
                </Label>
                <InputWithLargerFont
                  id="currentRevenue"
                  placeholder="Enter current revenue"
                  value={currentRevenue}
                  onChange={(e) => setCurrentRevenue(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
            >
              <Calculator className="mr-2 h-5 w-5" /> Crunch the Numbers
            </Button>
          </CardContent>
        </Card>
      </form>
      <div ref={resultRef}>
        {hypotheticalMax !== null && (
          <>
            {hypotheticalMax > parseFloat(currentRevenue) && (
              <CongratulationMessage
                hypotheticalMax={hypotheticalMax}
                growthPotential={growthPotential || 1}
              />
            )}
            {hypotheticalMax === parseFloat(currentRevenue) && (
              <NeutralMaxRevenueCard maxRevenue={hypotheticalMax} />
            )}
            {hypotheticalMax < parseFloat(currentRevenue) && (
              <ShrinkingRevenueCard
                maxRevenue={hypotheticalMax}
                shrinkFactor={shrinkFactor || 1}
                shrinkPercentage={shrinkPercentage || 0}
                breakEvenChurn={breakEvenChurn || 0}
                breakEvenSalesVolume={breakEvenSalesVolume || 0}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}