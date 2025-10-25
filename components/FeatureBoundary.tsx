/**
 * Feature-specific Error Boundary Component
 *
 * Provides granular error handling for individual features/sections of the page.
 * If a feature fails, only that feature shows an error message while the rest
 * of the page continues to function normally.
 *
 * Usage:
 * ```tsx
 * <FeatureBoundary featureName="contact form">
 *   <Contact {...props} />
 * </FeatureBoundary>
 * ```
 *
 * @module components/FeatureBoundary
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'
import styled from 'styled-components'

// ============================================
// TYPES
// ============================================

interface FeatureBoundaryProps {
  children: ReactNode
  featureName: string
  fallback?: ReactNode
}

interface FeatureBoundaryState {
  hasError: boolean
  error: Error | null
}

// ============================================
// STYLED COMPONENTS
// ============================================

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 2rem 0;
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
`

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const ErrorTitle = styled.h3`
  color: #991b1b;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-family: 'Moderat-Bold';
`

const ErrorMessage = styled.p`
  color: #7f1d1d;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`

const ErrorHint = styled.small`
  color: #991b1b;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.5rem;
`

// ============================================
// COMPONENT
// ============================================

/**
 * Feature Boundary Component
 *
 * Wraps features to provide isolated error handling
 */
class FeatureBoundary extends Component<FeatureBoundaryProps, FeatureBoundaryState> {
  constructor(props: FeatureBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): FeatureBoundaryState {
    // Update state so next render shows fallback UI
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console (in production, send to error monitoring service)
    console.error(
      `[FeatureBoundary] Error in "${this.props.featureName}":`,
      error,
      errorInfo
    )

    // In production, send to Sentry or similar service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with Sentry in Phase 6
      // Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback provided by parent
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <ErrorContainer role="alert">
          <ErrorIcon aria-hidden="true">⚠️</ErrorIcon>
          <ErrorTitle>Unable to load {this.props.featureName}</ErrorTitle>
          <ErrorMessage>
            We encountered an issue loading this section. Please refresh the page to try again.
          </ErrorMessage>
          <ErrorHint>
            If the problem persists, the rest of the page should still work normally.
          </ErrorHint>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default FeatureBoundary
