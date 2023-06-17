import { Providers } from '@/providers/react-query/query-client-provider'
import 'react-loading-skeleton/dist/skeleton.css'
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
