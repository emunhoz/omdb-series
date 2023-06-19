import { Providers } from '@/providers/react-query/query-client-provider'
import '../styles/global.css'

export const metadata = {
  title: 'OMDB series',
  description: 'OMDB series',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/favicon.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
