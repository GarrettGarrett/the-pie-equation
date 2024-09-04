"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface RevenueChartProps {
  currentRevenue: number;
  maxRevenue: number;
}

export function RevenueChart({ currentRevenue, maxRevenue }: RevenueChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 640);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const data = [
    {
      name: "Revenue",
      "Current Revenue": currentRevenue,
      "Max Revenue": maxRevenue,
    },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto ">
      <CardHeader >
        <CardTitle className="text-xl sm:text-2xl font-bold text-primary">Revenue Comparison</CardTitle>
        <CardDescription className="text-sm sm:text-lg text-[#50b8f2] dark:text-[#50b8f2]">Current vs Hypothetical Max Revenue</CardDescription>
        <CardDescription className="text-xs sm:text-md text-gray-600 dark:text-gray-400">
          Hypothetical Max: ${maxRevenue.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%" >
            <BarChart 
              className="m-au"
              data={data} 
              layout={isMobile ? "horizontal" : "vertical"}
              margin={isMobile ? { top: 20, right: 30, left: 20, bottom: 5 } : { left: 80, right: 30, top: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {isMobile ? (
                <>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString(undefined, {notation: 'compact', compactDisplay: 'short'})}`}
                    tick={{ fontSize: 10 }}
                  />
                </>
              ) : (
                <>
                  <XAxis 
                    type="number" 
                    tickFormatter={(value) => `$${value.toLocaleString(undefined, {notation: 'compact', compactDisplay: 'short'})}`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 14 }} />
                </>
              )}
              <Tooltip
                formatter={(value) => `$${(value as number).toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: isMobile ? '12px' : '14px',
                }}
              />
              <Legend 
                verticalAlign={isMobile ? "bottom" : "top"} 
                height={36} 
                wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} 
              />
              <Bar dataKey="Current Revenue" fill="#26309d" name="Current Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Max Revenue" fill="#d1523f" name="Max Revenue" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}