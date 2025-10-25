import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch React errors and prevent full app crashes
 * Wraps the application to provide graceful error handling
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for monitoring (integrate with Sentry, LogRocket, etc. in production)
    console.error('Error caught by ErrorBoundary:', error, errorInfo)

    // TODO: Send to error reporting service in production
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#6b7280' }}>
            We&apos;re sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#5568d3'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#667eea'
            }}
          >
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#fee2e2',
                borderRadius: '0.5rem',
                maxWidth: '600px',
                textAlign: 'left',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#991b1b' }}>
                Error Details (Development Only):
              </p>
              <pre
                style={{
                  fontSize: '0.875rem',
                  color: '#7f1d1d',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.toString()}
              </pre>
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
