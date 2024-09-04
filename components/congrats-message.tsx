import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import NumberTicker from "@/components/magicui/number-ticker";

interface CongratulationMessageProps {
  hypotheticalMax: number;
  growthPotential: number;
}

export default function CongratulationMessage({ hypotheticalMax, growthPotential }: CongratulationMessageProps) {
  // Remove rounding
  const growthMultiplier = growthPotential;

  return (
    <Card className="mt-6 bg-green-50">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-1/3 pb-4 sm:pb-0 sm:pr-4 sm:border-r border-green-300 flex flex-col justify-center items-center">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight text-green-700 text-center whitespace-nowrap">
              <NumberTicker value={growthMultiplier} className="text-green-700" />x
            </div>
            <div className="text-sm text-green-600 mt-1 text-center">
              Potential growth
            </div>
          </div>
          <div className="flex-grow sm:pl-4 space-y-2 text-center sm:text-left">
            <p className="text-lg text-green-700">
              Your hypothetical max revenue is <span className="font-semibold">${hypotheticalMax.toLocaleString()}</span> per month
            </p>
            <p className="text-sm text-green-600">
              That&apos;s {growthMultiplier.toFixed(2)}x your current revenue!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}