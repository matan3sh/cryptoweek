import { ReactNode } from 'react'

// Data Types
export interface SectionData {
  title: string
  subtitle: string
  color: string
  bg: string
}

export interface SpeakerData {
  name: string
  image: string
  role: string
}

export interface TeamMember {
  name: string
  image: string
  role: string
}

export interface HeaderLink {
  title: string
  link: string
}

export interface FeaturePartner {
  name: string
  height: string
  width: string
}

// Component Props Types
export interface GridSectionProps {
  data: string[]
  title: string
  link: string
}

export interface GridTextProps {
  title: string
  data: SpeakerData[] | TeamMember[]
  link: string
}

export interface SectionProps {
  data: SectionData
}

export interface ContactProps {
  onSubmit: (values: ContactFormValues) => void
  success: boolean
}

export interface ContactFormValues {
  name: string
  email: string
  message: string
}

// Service Types
export interface SendMessageRequest {
  name: string
  email: string
  message: string
}

export interface SendMessageResponse {
  success: boolean
  message?: string
  error?: string
}

// Styled Components Theme Types
export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    white: string
    black: string
  }
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
  }
  fonts: {
    light: string
    regular: string
    medium: string
    bold: string
  }
}

// Navigation Types
export interface DropDownProps {
  toggle: () => void
  isOpen: boolean
  data: HeaderLink[]
}

// Page Props Types
export interface HomePageProps {
  // Add any props that might be passed to the home page
}

// Next.js Types
export interface PageProps {
  params: { [key: string]: string | string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface LayoutProps {
  children: ReactNode
  params?: { [key: string]: string | string[] }
}

// API Route Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Error Types
export interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

// Loading Types
export interface LoadingProps {
  // Add any loading component props if needed
}
