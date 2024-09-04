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
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback.trim().length < 10) {
      setError('Feedback must be at least 10 characters long.')
      return
    }
    // Here you would typically send the feedback to your server
    console.log('Feedback submitted:', feedback)
    setIsSubmitted(true)
    setError('')
    // Reset form after 3 seconds
    setTimeout(() => {
      setFeedback('')
      setIsSubmitted(false)
      setIsOpen(false)
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Submit Feedback</Button>
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
          {isSubmitted && (
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Thank you for your feedback!</span>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isSubmitted}>
              {isSubmitted ? 'Submitted' : 'Submit Feedback'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}