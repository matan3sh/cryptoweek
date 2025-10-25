# Styling Guide - Phase 4

## Overview

This project uses **styled-components** with a centralized theme system for consistent, maintainable styling across the application.

## Theme Configuration

The centralized theme is located at `/styles/theme.ts` and provides:

- **Colors**: Primary, text, background, success/error states, glass effects, borders
- **Gradients**: Primary, secondary, accent gradients
- **Spacing**: Consistent spacing scale (xs to 4xl)
- **Border Radii**: sm, md, lg, xl, full
- **Shadows**: Various shadow and glow effects
- **Blur**: Backdrop blur levels
- **Typography**: Font families, sizes, weights, line heights
- **Breakpoints**: Responsive breakpoint values
- **Media Queries**: Pre-configured media query strings
- **Z-Index**: Layering system for modals, tooltips, etc.
- **Transitions**: Animation timing functions

## Using the Theme

### Basic Usage

All styled-components have access to the theme via props:

```typescript
import styled from 'styled-components'

const Button = styled.button`
  color: ${props => props.theme.colors.textWhite};
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radii.sm};
  font-family: ${props => props.theme.fonts.medium};
  transition: ${props => props.theme.transitions.base};
`
```

### Color System

#### Primary Colors
- `theme.colors.primary` - Main brand color (#667eea)
- `theme.colors.primaryDark` - Darker variant
- `theme.colors.primaryLight` - Lighter variant

#### Text Colors
- `theme.colors.textPrimary` - Primary text (#1a202c)
- `theme.colors.textSecondary` - Secondary text (#2d3748)
- `theme.colors.textTertiary` - Tertiary text (#4a5568)
- `theme.colors.textMuted` - Muted text (#718096)
- `theme.colors.textWhite` - White text (#ffffff)

#### Status Colors
- `theme.colors.success` - Success state (#48bb78)
- `theme.colors.error` - Error state (#f56565)
- `theme.colors.warning` - Warning state (#ed8936)
- `theme.colors.info` - Info state (#4299e1)

#### Background Colors
- `theme.colors.bgWhite` - White background
- `theme.colors.bgLight` - Light background
- `theme.colors.bgGray` - Gray background

#### Glassmorphism Effects
- `theme.colors.glass.white` - Subtle glass effect (10% opacity)
- `theme.colors.glass.surfaceLight` - Light glass surface (70% opacity)
- `theme.colors.glass.surfaceMedium` - Medium glass surface (50% opacity)

### Typography

#### Font Families
```typescript
font-family: ${props => props.theme.fonts.body};      // 'Moderat-Regular'
font-family: ${props => props.theme.fonts.heading};   // 'Moderat-Bold'
font-family: ${props => props.theme.fonts.medium};    // 'Moderat-Medium'
font-family: ${props => props.theme.fonts.bold};      // 'Moderat-Bold'
```

#### Font Sizes
```typescript
font-size: ${props => props.theme.fontSizes.xs};      // 12px
font-size: ${props => props.theme.fontSizes.sm};      // 14px
font-size: ${props => props.theme.fontSizes.md};      // 16px
font-size: ${props => props.theme.fontSizes.lg};      // 18px
font-size: ${props => props.theme.fontSizes['2xl']};  // 24px
font-size: ${props => props.theme.fontSizes['5xl']};  // 48px
```

#### Font Weights
```typescript
font-weight: ${props => props.theme.fontWeights.light};   // 200
font-weight: ${props => props.theme.fontWeights.normal};  // 400
font-weight: ${props => props.theme.fontWeights.medium};  // 600
font-weight: ${props => props.theme.fontWeights.bold};    // 700
```

#### Line Heights
```typescript
line-height: ${props => props.theme.lineHeights.tight};    // 1.25
line-height: ${props => props.theme.lineHeights.normal};   // 1.5
line-height: ${props => props.theme.lineHeights.relaxed};  // 1.75
```

### Spacing

Use the consistent spacing scale instead of hardcoded pixel values:

```typescript
padding: ${props => props.theme.spacing.xs};   // 8px
padding: ${props => props.theme.spacing.sm};   // 16px
padding: ${props => props.theme.spacing.md};   // 24px
padding: ${props => props.theme.spacing.lg};   // 32px
padding: ${props => props.theme.spacing.xl};   // 48px
padding: ${props => props.theme.spacing['2xl']}; // 64px

// Combine spacing values
padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
```

### Border Radius

```typescript
border-radius: ${props => props.theme.radii.sm};   // 12px
border-radius: ${props => props.theme.radii.md};   // 16px
border-radius: ${props => props.theme.radii.lg};   // 24px
border-radius: ${props => props.theme.radii.xl};   // 32px
border-radius: ${props => props.theme.radii.full}; // 9999px (circular)
```

### Shadows

```typescript
box-shadow: ${props => props.theme.shadows.sm};            // Subtle shadow
box-shadow: ${props => props.theme.shadows.md};            // Medium shadow
box-shadow: ${props => props.theme.shadows.lg};            // Large shadow
box-shadow: ${props => props.theme.shadows.glowPurple};    // Purple glow
box-shadow: ${props => props.theme.shadows.glowPurpleStrong}; // Strong purple glow
```

### Transitions

```typescript
transition: ${props => props.theme.transitions.fast};   // 150ms ease
transition: ${props => props.theme.transitions.base};   // 250ms ease
transition: ${props => props.theme.transitions.slow};   // 350ms ease
transition: ${props => props.theme.transitions.slower}; // 500ms ease
```

### Responsive Design

#### Using Breakpoints
```typescript
@media screen and (max-width: ${props => props.theme.breakpoints.md}) {
  font-size: 14px;
}
```

#### Using Pre-configured Media Queries
```typescript
${props => props.theme.media.md} {
  font-size: 14px;
}
```

Available breakpoints:
- `xs`: 480px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Best Practices

### 1. Always Use Theme Values

❌ **Don't** hardcode values:
```typescript
const Button = styled.button`
  color: #ffffff;
  background: #667eea;
  padding: 16px 32px;
  font-family: 'Moderat-Medium';
`
```

✅ **Do** use theme values:
```typescript
const Button = styled.button`
  color: ${props => props.theme.colors.textWhite};
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.fonts.medium};
`
```

### 2. Component Organization

Organize styled-components in separate `styles.ts` files:

```
components/
  MyComponent/
    MyComponent.tsx      # Component logic
    styles.ts            # Styled components
    index.ts             # Exports
```

### 3. Naming Conventions

Use descriptive names that reflect the component's purpose:

```typescript
export const Container = styled.div`...`
export const Wrapper = styled.div`...`
export const Title = styled.h1`...`
export const Description = styled.p`...`
export const Button = styled.button`...`
```

### 4. TypeScript Integration

The theme is fully typed. Import the Theme type when needed:

```typescript
import { Theme } from '@/styles/theme'

const getColor = (theme: Theme) => theme.colors.primary
```

### 5. CSS Variables

The project still uses CSS variables (var(--*)) for some legacy values. These are being gradually migrated to the theme system. When possible, prefer theme values over CSS variables.

**Current CSS Variables** (legacy):
```css
var(--space-xl)
var(--glass-surface-light)
var(--border-glass)
var(--radius-xl)
var(--blur-lg)
var(--glow-purple)
var(--bg-gradient-secondary)
```

**Theme Equivalents** (preferred):
```typescript
${props => props.theme.spacing.xl}
${props => props.theme.colors.glass.surfaceLight}
${props => props.theme.colors.border.glass}
${props => props.theme.radii.xl}
${props => props.theme.blur.lg}
${props => props.theme.shadows.glowPurple}
${props => props.theme.gradients.secondary}
```

### 6. Glassmorphism Effects

For glassmorphism styling, combine theme values:

```typescript
const Card = styled.div`
  background: ${props => props.theme.colors.glass.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border.glass};
  border-radius: ${props => props.theme.radii.xl};
  backdrop-filter: ${props => props.theme.blur.lg};
  box-shadow: ${props => props.theme.shadows.md};
`
```

### 7. Interactive States

Always provide clear hover, focus, and active states:

```typescript
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  transition: ${props => props.theme.transitions.base};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glowPurpleStrong};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
```

## Migration from Hardcoded Values

When updating existing components:

1. **Find hardcoded values**: Look for hex colors (#667eea), pixel values (16px), font names
2. **Replace with theme**: Use the appropriate theme token
3. **Test the component**: Ensure visual appearance remains consistent
4. **Check responsive behavior**: Verify breakpoints still work correctly

## Theme Extension

To add new theme values, edit `/styles/theme.ts`:

```typescript
export const theme = {
  colors: {
    // Add new colors here
    newColor: '#hexvalue',
  },
  // ... other properties
} as const
```

TypeScript will automatically pick up the new values.

## Component Examples

### Button Component
```typescript
const PrimaryButton = styled.button`
  font-family: ${props => props.theme.fonts.medium};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textWhite};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.radii.sm};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.glowPurple};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    box-shadow: ${props => props.theme.shadows.glowPurpleStrong};
  }
`
```

### Card Component
```typescript
const Card = styled.div`
  background: ${props => props.theme.colors.glass.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border.glass};
  border-radius: ${props => props.theme.radii.xl};
  padding: ${props => props.theme.spacing.xl};
  backdrop-filter: ${props => props.theme.blur.lg};
  box-shadow: ${props => props.theme.shadows.md};
`
```

### Heading Component
```typescript
const Heading = styled.h1`
  font-family: ${props => props.theme.fonts.bold};
  font-size: ${props => props.theme.fontSizes['5xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.textPrimary};
  line-height: ${props => props.theme.lineHeights.tight};
  margin-bottom: ${props => props.theme.spacing.md};

  ${props => props.theme.media.md} {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`
```

## Related Documentation

- **Theme File**: `/styles/theme.ts`
- **GlobalStyles**: `/styles/globalStyles.ts`
- **App Configuration**: `/pages/_app.tsx`

## Summary

The Phase 4 styling system provides:

✅ **Consistency**: All components use the same design tokens
✅ **Maintainability**: Easy to update colors, spacing, and typography across the app
✅ **Type Safety**: Full TypeScript support for theme values
✅ **Performance**: Centralized theme with no runtime cost
✅ **Scalability**: Easy to extend and customize

For questions or improvements, refer to the theme file or contact the development team.
