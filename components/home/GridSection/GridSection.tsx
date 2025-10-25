import { memo } from 'react'
import Image from 'next/image'
import { Container, List } from './styles'

interface GridSectionProps {
  data: string[]
  title: string
  link: string
}

/**
 * GridSection component - Displays a grid of partner/supporter logos
 * Memoized with custom comparison to prevent re-renders when data hasn't changed
 */
const GridSection: React.FC<GridSectionProps> = ({ data, title, link }) => {
  return (
    <Container id={link}>
      <h1>{title}</h1>

      <List>
        {data.map((partner) => (
          <div key={partner}>
            <Image
              src={partner}
              alt="Partner logo"
              width={200}
              height={100}
              quality={85}
              loading="lazy"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </List>
    </Container>
  )
}

// Memoize with custom comparison function
// Only re-render if data, title, or link actually changed
export default memo(GridSection, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.link === next.link &&
    prev.data.length === next.data.length &&
    prev.data.every((item, i) => item === next.data[i])
  )
})
