import Image from 'next/image'
import { Container } from './styles'

const GiftCard: React.FC = () => {
  return (
    <Container>
      <Image
        src="/images/gift_cards/online-shopping-3d-rendering-clothes-online-shop-online-payment-delivery-concept-sale-banner-bag-dis-scaled.jpg"
        alt="Gift Card - Worth of $101K Prizes"
        width={800}
        height={600}
        quality={85}
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <div>
        <h5>Worth of $101K Prizes</h5>
        <h5>Including Gift Cards and Credits sponsored by Microsoft.</h5>
      </div>
    </Container>
  )
}

export default GiftCard
