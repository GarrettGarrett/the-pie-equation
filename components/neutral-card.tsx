import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import NumberTicker from "@/components/magicui/number-ticker";

interface NeutralMaxRevenueCardProps {
  maxRevenue: number
}

export default function NeutralMaxRevenueCard({
  maxRevenue,
}: NeutralMaxRevenueCardProps) {
  return (
    <Card className="mt-6 bg-gray-50">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-1/3 pb-4 sm:pb-0 sm:pr-4 sm:border-r border-gray-300 flex flex-col justify-center items-center">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-700 text-center whitespace-nowrap">
              <NumberTicker value={100} />%
            </div>
            <div className="text-sm text-gray-500 mt-1 text-center">
              You reached your hypothetical max!
            </div>
          </div>
          <div className="flex-grow sm:pl-4 space-y-2 text-center sm:text-left">
            <p className="text-lg text-gray-700">
              Your maximum revenue potential is <span className="font-semibold">${maxRevenue.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
            </p>
            <p className="text-sm text-gray-600">
              To grow further, consider:
            </p>
            <ul className="text-sm list-disc list-inside text-gray-600">
              <li>Increasing your monthly sales volume</li>
              <li>Decreasing your churn rate</li>
              <li>Raising your prices</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}