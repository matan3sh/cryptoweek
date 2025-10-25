import GlobalStyle from '@/styles/globalStyles'
import ErrorBoundary from '@/components/ErrorBoundary'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default MyApp
