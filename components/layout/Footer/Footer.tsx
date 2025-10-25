import type { SiteSettings } from '@/lib/content/interfaces'
import { memo } from 'react'
import { Container } from './styles'

interface FooterProps {
  settings: SiteSettings
}

/**
 * Footer component - Site footer with copyright and contact
 * Memoized because settings rarely change
 */
const Footer: React.FC<FooterProps> = ({ settings }) => {

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
