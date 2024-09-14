import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { CSPostHogProvider } from './providers'
import type { Metadata } from 'next'


const fontHeading = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: '700', 
})

const fontBody = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400', 
})


export const metadata: Metadata = {
  title: "The Pie Equation",
  description: "The Pie Equation",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        secureUrl: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preview image for The Pie Equation",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <CSPostHogProvider>
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
        > 
        {children}
        <Toaster />
      </body>
      </CSPostHogProvider>
      </body>
    </html>
  );
}
