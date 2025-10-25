import Image from 'next/image'
import { memo } from 'react'
import { Container } from './styles'

/**
 * GiftCard component - Completely static content
 * Memoized to prevent unnecessary re-renders
 */
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

// Memoize: This component has no props and never changes
export default memo(GiftCard)
