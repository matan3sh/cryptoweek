import styled from 'styled-components'

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  border-radius: 0 0 4px 0;
  font-weight: 600;

  &:focus {
    top: 0;
  }
`

/**
 * Skip to Content Link
 * Provides keyboard users a way to skip navigation and go directly to main content
 * Hidden by default, visible when focused
 */
export const SkipToContent: React.FC = () => {
  return (
    <SkipLink href="#main-content">
      Skip to main content
    </SkipLink>
  )
}
