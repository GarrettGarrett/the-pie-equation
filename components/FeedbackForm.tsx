'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, Flag, Loader2 } from "lucide-react"

export default function FeedbackForm({ onSubmit, isCondensed }: { onSubmit: (feedback: string) => Promise<void>, isCondensed: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback.trim().length < 10) {
      setError('Feedback must be at least 10 characters long.')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      await onSubmit(feedback)
      setFeedback('')
      setIsOpen(false)
    } catch (error) {
      setError('An error occurred while submitting feedback. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            {isCondensed ? (
              <Flag className="w-4 h-4" />
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit Feedback</DialogTitle>
            <DialogDescription>
            We&apos;d love to hear what went well or how we can improve the this tool.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here..."
              className="min-h-[100px]"
            />
            {error && (
              <div className="flex items-center gap-2 mt-2 text-red-500">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}