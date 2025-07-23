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

const GridText: React.FC<GridTextProps> = ({ title, data, link }) => {
  return (
    <Container id={link}>
      <h1>{title}</h1>
      <List>
        {data.map((item, key) => (
          <div key={key}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <h3>{item.role}</h3>
          </div>
        ))}
      </List>
    </Container>
  )
}

export default GridText
