import { getSiteSettings } from '@/lib/content/static'
import { memo } from 'react'
import { Container } from './styles'

/**
 * Footer component - Site footer with copyright and contact
 * Memoized because settings rarely change
 */
const Footer: React.FC = () => {
  const settings = getSiteSettings()

  return (
    <Container as="footer" role="contentinfo">
      <p>
        {settings.footer.copyrightText} &#169; {settings.footer.year}
      </p>
      <p>
        <a
          href={`mailto:${settings.footer.email}`}
          aria-label={`Send email to ${settings.footer.email}`}
        >
          {settings.footer.email}
        </a>
      </p>
    </Container>
  )
}

// Memoize: Settings don't change during runtime
export default memo(Footer)
