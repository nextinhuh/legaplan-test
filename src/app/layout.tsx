import type { Metadata } from 'next'
import { Inter_Tight as interTightFont } from 'next/font/google'

import './globals.scss'

const interTight = interTightFont({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FocalPoint',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={interTight.className}>{children}</body>
    </html>
  )
}
