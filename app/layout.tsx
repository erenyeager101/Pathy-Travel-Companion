import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pathify',
  description: 'Turn Your Travel Dreams into Reality',
  generator: 'Team pathify',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
