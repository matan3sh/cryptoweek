import { Container, List } from './styles'

interface GridSectionProps {
  data: string[]
  title: string
  link: string
}

const GridSection: React.FC<GridSectionProps> = ({ data, title, link }) => {
  return (
    <Container id={link}>
      <h1>{title}</h1>
      <List>
        {data.map((partner, key) => (
          <img src={partner} alt="" key={key} />
        ))}
      </List>
    </Container>
  )
}

export default GridSection
