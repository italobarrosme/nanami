import '@/styles/globals.css'

import { ReactNode } from 'react'
import { Metadata } from 'next'
import { ToastProvider } from '@/providers/toast'
import { Nunito_Sans } from 'next/font/google'

type Props = {
  children?: ReactNode
}

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  fallback: ['sans-serif'],
})

export const metadata: Metadata = {
  title: 'Noble - Sistema de Crescimento Pessoal',
  description:
    'Noble é uma plataforma de crescimento pessoal que ajuda você a se tornar a melhor versão de si mesmo.',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="overflow-hidden bg-primary-dark bg-effect-granula">
        <ToastProvider>
          <main>{children}</main>
        </ToastProvider>
      </body>
    </html>
  )
}
