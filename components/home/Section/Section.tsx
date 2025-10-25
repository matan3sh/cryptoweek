import type { ContentSection } from '@/lib/content/interfaces'
import { memo } from 'react'
import { Container, Wrapper } from './styles'

interface SectionProps {
  data: ContentSection
}

/**
 * Section component - Displays content section with background
 * Memoized with custom comparison to prevent re-renders when data hasn't changed
 */
const Section: React.FC<SectionProps> = ({ data }) => {
  // Map semantic theme to color value
  const themeColors = {
    light: '#fff',
    dark: '#3f354d',
  }

  const textColor = data._legacyColor || themeColors[data.theme]
  const backgroundImage = data.backgroundImage || ''

  return (
    <Container
      style={{
        color: textColor,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Wrapper>
        <h1>{data.title}</h1>
        <p>{data.subtitle}</p>
      </Wrapper>
    </Container>
  )
}

// Memoize with custom comparison function
// Only re-render if content actually changed
export default memo(Section, (prev, next) => {
  return (
    prev.data.title === next.data.title &&
    prev.data.subtitle === next.data.subtitle &&
    prev.data.theme === next.data.theme &&
    prev.data.backgroundImage === next.data.backgroundImage
  )
})
