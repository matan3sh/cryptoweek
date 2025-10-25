import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@/styles/globalStyles'
import theme from '@/styles/theme'
import ErrorBoundary from '@/components/ErrorBoundary'
import { AppProps } from 'next/app'

/**
 * Root App Component
 *
 * Phase 4: Added ThemeProvider for consistent theming
 * All styled-components now have access to theme values
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default MyApp
