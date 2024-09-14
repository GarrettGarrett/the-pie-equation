'use client'

import React, { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { submitFeedback } from '@/app/actions/submitFeedback'

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (feedback.length < 5) {
      toast({
        title: "Error",
        description: "Feedback must be at least 5 characters long.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('feedback', feedback);
      const result = await submitFeedback(formData);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Your feedback has been submitted. Thank you!",
        });
        onClose();
        setFeedback('');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leaf Feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear what went well or how we can improve the product experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Input
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your Feedback"
            />
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;