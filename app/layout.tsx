import type { Metadata } from 'next'
import './globals.css'
import '../styles/sf-pro.css'
import '../styles/section-transitions.css'

export const metadata: Metadata = {
  title: 'Battle Cards',
  description: 'Battle Cards App',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* SF Pro font is now imported from the CSS file */}
      </head>
      <body>{children}</body>
    </html>
  )
}
