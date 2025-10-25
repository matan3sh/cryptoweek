# Development Guide

Complete development workflow, best practices, and guidelines for the CryptoWeek project.

---

## Getting Started

### Prerequisites
- **Node.js:** 18.x or higher
- **npm:** 9.x or higher
- **Git:** Latest version
- **Code Editor:** VS Code (recommended)

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd cryptoweek

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

### Environment Variables

Create `.env.local` file:
```env
# Add when needed
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Future: Sanity.io
# NEXT_PUBLIC_SANITY_PROJECT_ID=
# NEXT_PUBLIC_SANITY_DATASET=
# SANITY_API_TOKEN=
```

---

## Development Commands

### Core Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production Build
npm run build            # Build for production
npm start                # Start production server

# Type Checking
npm run type-check       # Run TypeScript compiler
npm run type-check:watch # Watch mode

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix issues
```

### Recommended Scripts (add to package.json)

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest",
    "test:watch": "jest --watch",
    "clean": "rm -rf .next out"
  }
}
```

---

## Project Structure

```
cryptoweek/
├── components/           # React components
│   ├── home/            # Page-specific
│   ├── layout/          # Layout components
│   ├── SEO/             # SEO components
│   └── icons/           # Icon components
├── content/             # Content files (JSON)
│   ├── settings.json    # Site config
│   └── pages/           # Page content
├── data/                # Legacy data (to be removed)
├── docs/                # Documentation
├── lib/                 # Utilities
│   └── content/         # Content layer
├── pages/               # Next.js pages
│   ├── api/             # API routes
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # HTML document
│   └── index.tsx        # Home page
├── public/              # Static assets
│   ├── static/          # Images, fonts
│   ├── robots.txt       # SEO
│   └── sitemap.xml      # SEO
├── services/            # API services
├── styles/              # Global styles
├── types/               # TypeScript types
└── .next/               # Build output (gitignored)
```

---

## Coding Standards

### TypeScript

**Use Strict Mode:**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Type Everything:**
```typescript
// ❌ Avoid
const getData = (id) => { ... }

// ✅ Prefer
const getData = (id: string): Promise<Data> => { ... }
```

**Use Interfaces for Objects:**
```typescript
// ✅ Component Props
interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  // ...
}
```

### React Components

**Functional Components:**
```typescript
// ✅ Prefer functional components
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>...</div>
}

export default MyComponent
```

**Use Hooks:**
```typescript
import { useState, useCallback, useEffect, useMemo } from 'react'

const Component = () => {
  const [state, setState] = useState(initialState)

  const memoizedValue = useMemo(() => {
    return expensiveCalculation(state)
  }, [state])

  const handleClick = useCallback(() => {
    // ...
  }, [dependencies])

  useEffect(() => {
    // Side effects
  }, [dependencies])
}
```

**Component Organization:**
```typescript
// 1. Imports
import { useState } from 'react'
import { Container } from './styles'

// 2. Types/Interfaces
interface Props {
  title: string
}

// 3. Component
const Component: React.FC<Props> = ({ title }) => {
  // 3.1 Hooks
  const [state, setState] = useState()

  // 3.2 Handlers
  const handleClick = () => { ... }

  // 3.3 Render
  return <Container>...</Container>
}

// 4. Export
export default Component
```

### Styling

**Styled Components Pattern:**
```typescript
// styles.ts
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`

// Component.tsx
import { Container } from './styles'

const Component = () => <Container>...</Container>
```

**Avoid Inline Styles:**
```typescript
// ❌ Avoid (except for dynamic styles)
<div style={{ color: 'red', padding: '20px' }}>

// ✅ Prefer
<StyledDiv>
```

### File Naming

**Components:**
```
ComponentName/
├── ComponentName.tsx      # Component
├── styles.ts              # Styled components
└── index.ts               # Export
```

**General Files:**
- Components: PascalCase (Header.tsx)
- Utilities: camelCase (formatDate.ts)
- Types: PascalCase (interfaces.ts)
- Constants: UPPER_SNAKE_CASE (if truly constant)

---

## Git Workflow

### Branch Naming

```bash
feature/add-new-section
fix/contact-form-validation
refactor/content-layer
docs/update-readme
```

### Commit Messages

**Format:**
```
type(scope): description

[optional body]
[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting (no code change)
- `refactor:` Code change (no feat/fix)
- `perf:` Performance improvement
- `test:` Adding tests
- `chore:` Build/tooling

**Examples:**
```bash
feat(contact): add email validation
fix(header): mobile menu keyboard navigation
docs(architecture): update content layer docs
refactor(seo): extract meta tags to component
```

### Pull Request Process

1. **Create Feature Branch:**
```bash
git checkout -b feature/my-feature
```

2. **Make Changes & Commit:**
```bash
git add .
git commit -m "feat: add new feature"
```

3. **Push Branch:**
```bash
git push origin feature/my-feature
```

4. **Create PR:**
- Clear title and description
- Link related issues
- Add screenshots (if UI change)
- Request review

5. **Before Merge:**
```bash
npm run type-check
npm run lint
npm run build
```

---

## Testing Strategy

### Type Checking

**Always run before commit:**
```bash
npm run type-check
```

**Watch mode during development:**
```bash
npm run type-check:watch
```

### Linting

**Check for issues:**
```bash
npm run lint
```

**Auto-fix when possible:**
```bash
npm run lint:fix
```

### Manual Testing Checklist

**Before Every PR:**
- [ ] Page loads without errors
- [ ] All animations work
- [ ] Forms validate correctly
- [ ] Mobile responsive
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Type check passes
- [ ] Lint passes
- [ ] Build succeeds

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## Performance Best Practices

### Component Optimization

**Use React.memo:**
```typescript
// For expensive components
import { memo } from 'react'

const ExpensiveComponent = memo(({ data }) => {
  // Expensive rendering
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data === nextProps.data
})
```

**useMemo for Expensive Calculations:**
```typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])
```

**useCallback for Functions:**
```typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies])
```

### Image Optimization

**Always use Next.js Image:**
```typescript
import Image from 'next/image'

// ✅ Hero images
<Image
  src="/hero.jpg"
  width={1920}
  height={1080}
  priority  // LCP optimization
  quality={85}
/>

// ✅ Below fold images
<Image
  src="/image.jpg"
  width={800}
  height={600}
  loading="lazy"
  quality={75}
/>
```

### Code Splitting

**Dynamic Imports:**
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false  // If client-side only
  }
)
```

---

## Debugging

### React DevTools

**Installation:**
- Chrome: React Developer Tools extension
- Firefox: React Developer Tools extension

**Usage:**
- Inspect component tree
- View props and state
- Profile component renders
- Find unnecessary re-renders

### Next.js Debug Mode

```bash
# Enable debug mode
NODE_OPTIONS='--inspect' npm run dev

# Then open Chrome and go to:
chrome://inspect
```

### Common Issues

**Issue: Type errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue: Styling not updating**
```bash
# Restart dev server
# Clear browser cache
# Check styled-components version
```

**Issue: Images not loading**
```bash
# Check file paths (case-sensitive)
# Verify image is in /public
# Check Image component props
```

---

## Content Editing

### Editing Site Content

**1. Site Settings:**
```
File: /content/settings.json
Edit: Site title, description, logo, footer, etc.
```

**2. Home Page:**
```
File: /content/pages/home.json
Edit: Hero section, about section, etc.
```

**3. Images:**
```
Location: /public/static/images/
Add new images here
```

### Content Best Practices

**JSON Formatting:**
```bash
# Format JSON files
npx prettier --write "content/**/*.json"
```

**Validation:**
```bash
# Validate JSON syntax
npm run type-check  # Will catch structure errors
```

---

## Deployment

### Pre-Deployment Checklist

```bash
# 1. Type check
npm run type-check

# 2. Lint
npm run lint

# 3. Build
npm run build

# 4. Test build locally
npm start
# Visit http://localhost:3000

# 5. Test all features manually
```

### Vercel Deployment

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

**Environment Variables:**
Add in Vercel dashboard:
- Production
- Preview
- Development

### Other Platforms

**Build Output:**
```
.next/         # Next.js build
out/           # Static export (if using `next export`)
```

**Server Requirements:**
- Node.js 18+
- npm 9+
- 1GB RAM minimum
- PM2 for process management (recommended)

---

## Troubleshooting

### Build Errors

**Type Errors:**
```bash
npm run type-check
# Fix all type errors before building
```

**ESLint Errors:**
```bash
npm run lint:fix
# Review and commit changes
```

**Module Not Found:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Runtime Errors

**Check Browser Console:**
- Open DevTools (F12)
- Check Console tab
- Check Network tab for failed requests

**Check Server Logs:**
```bash
# Development
# Errors shown in terminal

# Production
pm2 logs
```

---

## IDE Setup

### VS Code

**Recommended Extensions:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "styled-components.vscode-styled-components",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

**Settings (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Prettier

**Configuration (.prettierrc):**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## Best Practices Summary

### Do's ✅

- Use TypeScript for everything
- Write descriptive component names
- Add JSDoc comments for complex functions
- Use semantic HTML
- Optimize images with Next.js Image
- Add alt text to all images
- Use React.memo for expensive components
- Keep components small and focused
- Write meaningful commit messages
- Test on multiple browsers
- Run type-check and lint before committing

### Don'ts ❌

- Don't use `any` type
- Don't inline styles (except dynamic)
- Don't use index as key in lists
- Don't forget error handling
- Don't skip accessibility
- Don't commit console.log statements
- Don't push broken builds
- Don't hardcode URLs or content
- Don't use `<img>` tag (use Next.js Image)
- Don't ignore ESLint warnings

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Styled Components](https://styled-components.com/docs)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

---

**Last Updated:** 2025-10-25
