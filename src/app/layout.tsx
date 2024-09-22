import type { Metadata } from 'next'
import { Inter_Tight as interTightFont } from 'next/font/google'

import './globals.scss'
import { ReactQueryProvider } from '@/hooks/ReactQueryProvider'

const interTight = interTightFont({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FocalPoint',
  icons: {
    icon: '/assets/icons/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={interTight.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
