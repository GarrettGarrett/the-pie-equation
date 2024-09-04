import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import NumberTicker from "@/components/magicui/number-ticker";

interface ShrinkingRevenueCardProps {
	maxRevenue: number;
	shrinkFactor: number;
	shrinkPercentage: number;
	breakEvenChurn: number;
	breakEvenSalesVolume: number;
}

export function ShrinkingRevenueCard({
	maxRevenue,
	shrinkFactor,
	shrinkPercentage,
	breakEvenChurn,
	breakEvenSalesVolume
}: ShrinkingRevenueCardProps) {
	return (
		<Card className="mt-6 bg-red-50">
			<CardContent className="pt-6">
				<div className="flex flex-col sm:flex-row items-center">
					<div className="w-full sm:w-1/3 pb-4 sm:pb-0 sm:pr-4 sm:border-r border-red-300 flex flex-col justify-center items-center">
						<div className="text-4xl sm:text-5xl font-bold tracking-tight text-red-700 text-center whitespace-nowrap">
							<NumberTicker value={shrinkPercentage} className="text-red-700" />%
						</div>
						<div className="text-sm text-red-600 mt-1 text-center">
							Revenue Decrease
						</div>
					</div>
						<div className="flex-grow sm:pl-4 space-y-2 text-center sm:text-left">
							<h3 className="text-xl font-bold text-red-700 mb-2">Warning: Revenue Shrinkage</h3>
							<p className="text-red-700">
								Your hypothetical max revenue is <span className="font-semibold">${maxRevenue.toLocaleString(undefined, {maximumFractionDigits: 2})}</span> per month
							</p>
							<p className="text-red-700">
								To break even, you need to either:
							</p>
							<ul className="list-disc list-inside text-red-700">
								<li>Reduce churn to {(breakEvenChurn * 100).toFixed(2)}%</li>
								<li>Increase sales volume to {breakEvenSalesVolume}</li>
							</ul>
						</div>
				</div>
			</CardContent>
		</Card>
	);
}