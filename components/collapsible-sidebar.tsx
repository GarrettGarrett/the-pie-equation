"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronFirst, ChevronLast, Menu } from "lucide-react"

const menuItems = [
  "Dashboard",
  "Projects",
  "Tasks",
  "Calendar",
  "Documents",
  "Reports",
  "Teams",
  "Settings",
]

export function CollapsibleSidebar() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [activeItem, setActiveItem] = React.useState("Dashboard")

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="hidden lg:flex flex-col bg-gray-100 border-r"
      >
        <div className="p-4 flex justify-between items-center">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="w-10 h-10 p-0">
              {isOpen ? <ChevronFirst className="h-4 w-4" /> : <ChevronLast className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <h2 className="text-lg font-semibold">My App</h2>
          </CollapsibleContent>
        </div>
        <ScrollArea className="flex-1">
          <CollapsibleContent>
            <nav className="space-y-2 p-2">
              {menuItems.map((item) => (
                <Button
                  key={item}
                  variant={activeItem === item ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveItem(item)}
                >
                  {item}
                </Button>
              ))}
            </nav>
          </CollapsibleContent>
        </ScrollArea>
      </Collapsible>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">My App</h2>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item}
                    variant={activeItem === item ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveItem(item)}
                  >
                    {item}
                  </Button>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">{activeItem}</h1>
        <p>Main content goes here.</p>
      </main>
    </div>
  )
}