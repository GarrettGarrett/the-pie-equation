  "use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible,  CollapsibleTrigger } from "@/components/ui/collapsible"
import { ArrowLeftToLine, ArrowRightToLine, Menu } from "lucide-react"
import { ReactNode } from "react"
import FeedbackForm from "./FeedbackForm"

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface CollapsibleSidebarProps {
  children: ReactNode;
  tools: Tool[];
  activeTool: string;
  onToolSelect: (id: string) => void;
  onFeedbackSubmit: (feedback: string) => Promise<void>;
}

export default function CollapsibleSidebar({ children, tools, activeTool, onToolSelect, onFeedbackSubmit }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  const handleFeedbackSubmit = async (feedback: string) => {
    await onFeedbackSubmit(feedback);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-10">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] flex flex-col">
          <div className="flex-1 py-4">
            <h2 className="text-lg font-semibold mb-4">Tools</h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <nav className="space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Button
                      key={tool.id}
                      variant={activeTool === tool.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => onToolSelect(tool.id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tool.name}
                    </Button>
                  );
                })}
              </nav>
            </ScrollArea>
          </div>
          {/* FeedbackForm in mobile sidebar without border */}
          <div className="py-4">
            <FeedbackForm onSubmit={handleFeedbackSubmit} isCondensed={false} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className={`hidden lg:flex flex-col bg-gray-100 border-r ${
            isOpen ? 'w-64' : 'w-20'
          } transition-all duration-300`}
        >
          <div className={`p-4 ${isOpen ? '' : 'flex justify-center'}`}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10 p-0">
                {isOpen ? <ArrowLeftToLine className="h-5 w-5" /> : <ArrowRightToLine className="h-5 w-5" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <ScrollArea className="flex-1">
            <nav className="space-y-2 p-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;
                return (
                  <Button
                    key={tool.id}
                    variant="ghost"
                    className={`w-full ${isOpen ? 'justify-start px-4' : 'justify-center px-2'} py-2
                      ${isActive ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                    onClick={() => onToolSelect(tool.id)}
                  >
                    <Icon className={`h-5 w-5 ${isOpen ? 'mr-2' : ''}`} />
                    {isOpen && <span>{tool.name}</span>}
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>
          {/* Feedback button container */}
          <div className={`p-4 ${isOpen ? '' : 'flex justify-center'}`}>
            <FeedbackForm onSubmit={handleFeedbackSubmit} isCondensed={!isOpen} />
          </div>
        </Collapsible>

        {/* Mobile view container */}
        <div className="flex-1 relative lg:hidden">
          {/* Main Content */}
          <main className="w-full pt-16 ">
            {children}
          </main>
        </div>

        {/* Desktop view main content */}
        <main className="flex-1 hidden lg:block">
          {children}
        </main>
      </div>
    </>
  )
}