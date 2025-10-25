import { memo } from 'react'
import Image from 'next/image'
import { Container, List } from './styles'

interface GridTextItem {
  image: string
  name: string
  role: string
}

interface GridTextProps {
  title: string
  data: GridTextItem[]
  link: string
}

/**
 * GridText component - Displays a grid of people (speakers/team) with photos
 * Memoized with custom comparison to prevent re-renders when data hasn't changed
 */
const GridText: React.FC<GridTextProps> = ({ title, data, link }) => {
  return (
    <Container id={link}>
      <h1>{title}</h1>

      <List>
        {data.map((item) => (
          <div key={`${item.name}-${item.image}`}>
            <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                quality={85}
                loading="lazy"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
            <h2>{item.name}</h2>
            <h3>{item.role}</h3>
          </div>
        ))}
      </List>
    </Container>
  )
}

// Memoize with custom comparison function
// Only re-render if data, title, or link actually changed
export default memo(GridText, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.link === next.link &&
    prev.data.length === next.data.length &&
    prev.data.every((item, i) =>
      item.name === next.data[i].name &&
      item.image === next.data[i].image &&
      item.role === next.data[i].role
    )
  )
})
