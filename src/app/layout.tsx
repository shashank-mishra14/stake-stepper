import { SolanaProvider } from './providers/solana-provider'
import { QueryProvider } from './providers/query-provider'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SolanaProvider>
            {children}
          </SolanaProvider>
        </QueryProvider>
      </body>
    </html>
  )
}