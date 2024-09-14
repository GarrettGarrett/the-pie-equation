'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Youtube } from 'lucide-react'
import FeedbackModal from './FeedbackModal';

const Header: React.FC = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center p-4">
      <Button 
        variant="outline" 
        onClick={() => window.open('https://www.youtube.com/watch?v=XZEjp2mP1U0&', '_blank')}
        className="text-xs sm:text-sm"
      >
        <Youtube className="mr-2 h-4 w-4" /> 
        <span className="hidden sm:inline">Watch Alex Harmozi Explanation</span>
        <span className="sm:hidden">Watch Video</span>
      </Button>
      <Button onClick={() => setIsFeedbackModalOpen(true)}>Feedback</Button>
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
    </header>
  );
};

export default Header;