"use client"



import { useState, useRef, useEffect } from "react";
import { Toaster, toast } from 'sonner';
import PiEquationCalculator from "@/components/pi-equation-calculator";
import { RevenueChart } from "@/components/revenue-chart";
import CollapsibleSidebar from "@/components/Sidebar";
import { ChartPie } from 'lucide-react'
import { ConfettiSideCannons } from "@/components/confetti-side-cannons";
import YouTubeVideo from "@/components/youtube-video";
import HandwrittenNote from "@/components/HandwrittenNote";

const tools = [
  { id: "pie", name: "The PIE Equation", component: PiEquationCalculator, icon: ChartPie },
  // Add more tools here in the future
];

export default function Home() {
  const [currentRevenue, setCurrentRevenue] = useState();
  const [maxRevenue, setMaxRevenue] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [congratsMessage, setCongratsMessage] = useState("");
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    if (showChart) {
      // Scroll to the bottom of the page
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [showChart]);

  const handleCalculate = (current, max) => {
    setCurrentRevenue(current);
    setMaxRevenue(max);
    setShowChart(true);

    if (max > current) {
      setConfettiKey(prevKey => prevKey + 1);
    }
  };

  const handleToolSelect = (id) => {
    const tool = tools.find(t => t.id === id);
    if (tool) {
      setSelectedTool(tool);
      setShowChart(false);
      setCongratsMessage("");
    }
  };

  const handleFeedbackSubmit = async (feedback) => {
    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast.success('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster position="top-center" />
      <CollapsibleSidebar
        tools={tools}
        activeTool={selectedTool.id}
        onToolSelect={handleToolSelect}
        onFeedbackSubmit={handleFeedbackSubmit}
        className="h-full overflow-y-auto"
      />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl w-full px-4 py-6 mx-auto pb-20">
          <div className="w-full mb-6 mt-4 relative">
            <HandwrittenNote text="Learn more" />
            <YouTubeVideo videoId="XZEjp2mP1U0" />
          </div>
          {selectedTool.id === "pie" && (
            <>
              <PiEquationCalculator onCalculate={handleCalculate} />
              {showChart && (
                <div className="mt-8 w-full mb-20 " >
                  {maxRevenue > currentRevenue && (
                    <RevenueChart currentRevenue={currentRevenue} maxRevenue={maxRevenue} />
                  )}
                </div>
              )}
              
              {maxRevenue > currentRevenue && <ConfettiSideCannons key={confettiKey} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
