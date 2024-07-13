import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unit Converter',
  description: 'Convert between different units of measurement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}