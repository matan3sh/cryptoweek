import type { SectionData } from '@/types'
import { Container, Wrapper } from './styles'

interface SectionProps {
  data: SectionData
}

const Section: React.FC<SectionProps> = ({ data }) => {
  return (
    <Container
      style={{
        color: data.color,
        backgroundImage: `url(${data.bg})`,
      }}
    >
      <Wrapper>
        <h1>{data.title}</h1>
        <p>{data.subtitle}</p>
      </Wrapper>
    </Container>
  )
}

export default Section
