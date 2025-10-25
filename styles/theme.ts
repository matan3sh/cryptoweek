/**
 * Theme Configuration
 *
 * Centralized theme values for consistent styling across the application.
 * Phase 4: Consolidated colors, spacing, typography, and other design tokens.
 *
 * Usage with styled-components:
 * ```typescript
 * const Button = styled.button`
 *   color: ${props => props.theme.colors.primary};
 *   padding: ${props => props.theme.spacing.md};
 * `
 * ```
 *
 * @module styles/theme
 */

export const theme = {
  // ============================================
  // COLORS
  // ============================================
  colors: {
    // Primary Colors
    primary: '#667eea',
    primaryDark: '#5568d3',
    primaryLight: '#7e8ff5',

    // Text Colors
    textPrimary: '#1a202c',
    textSecondary: '#2d3748',
    textTertiary: '#4a5568',
    textMuted: '#718096',
    textWhite: '#ffffff',

    // Success/Error States
    success: '#48bb78',
    error: '#f56565',
    warning: '#ed8936',
    info: '#4299e1',

    // Backgrounds
    bgWhite: '#ffffff',
    bgLight: '#f7fafc',
    bgGray: '#edf2f7',

    // Glassmorphism
    glass: {
      white: 'rgba(255, 255, 255, 0.1)',
      whiteMedium: 'rgba(255, 255, 255, 0.15)',
      whiteStrong: 'rgba(255, 255, 255, 0.25)',
      surfaceLight: 'rgba(255, 255, 255, 0.7)',
      surfaceMedium: 'rgba(255, 255, 255, 0.5)',
      surfaceDark: 'rgba(255, 255, 255, 0.3)',
    },

    // Borders
    border: {
      glass: 'rgba(255, 255, 255, 0.3)',
      glassStrong: 'rgba(255, 255, 255, 0.5)',
      light: '#e2e8f0',
      medium: '#cbd5e0',
    },
  },

  // ============================================
  // GRADIENTS
  // ============================================
  gradients: {
    primary: 'linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #f8faff 100%)',
    secondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accent: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },

  // ============================================
  // SPACING
  // ============================================
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '96px',
    '4xl': '128px',
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  radii: {
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },

  // ============================================
  // SHADOWS
  // ============================================
  shadows: {
    sm: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    md: '0 12px 48px 0 rgba(31, 38, 135, 0.20)',
    lg: '0 20px 60px 0 rgba(31, 38, 135, 0.25)',
    glowPurple: '0 8px 32px rgba(102, 126, 234, 0.25)',
    glowPurpleStrong: '0 12px 48px rgba(102, 126, 234, 0.35)',
  },

  // ============================================
  // BLUR LEVELS
  // ============================================
  blur: {
    sm: 'blur(10px)',
    md: 'blur(20px)',
    lg: 'blur(30px)',
    xl: 'blur(40px)',
  },

  // ============================================
  // TYPOGRAPHY
  // ============================================
  fonts: {
    body: "'Moderat-Regular', sans-serif",
    heading: "'Moderat-Bold', sans-serif",
    light: "'Moderat-Light', sans-serif",
    medium: "'Moderat-Medium', sans-serif",
    bold: "'Moderat-Bold', sans-serif",
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },

  fontWeights: {
    light: 200,
    normal: 400,
    medium: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // ============================================
  // BREAKPOINTS
  // ============================================
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ============================================
  // MEDIA QUERIES
  // ============================================
  media: {
    xs: '@media screen and (max-width: 480px)',
    sm: '@media screen and (max-width: 640px)',
    md: '@media screen and (max-width: 768px)',
    lg: '@media screen and (max-width: 1024px)',
    xl: '@media screen and (max-width: 1280px)',
    '2xl': '@media screen and (max-width: 1536px)',
  },

  // ============================================
  // Z-INDEX LAYERS
  // ============================================
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // ============================================
  // TRANSITIONS
  // ============================================
  transitions: {
    fast: '150ms ease',
    base: '250ms ease',
    slow: '350ms ease',
    slower: '500ms ease',
  },
} as const

// TypeScript type for the theme
export type Theme = typeof theme

// Type declaration for styled-components
// This extends styled-components' DefaultTheme with our theme type
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

export default theme
