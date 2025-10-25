import type { SiteSettings, NavigationLink } from '@/lib/content/interfaces'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import DropDown from '../DropDown/DropDown'
import {
  BottomNavItem,
  LogoText,
  MenuBars,
  MobileMenuButton,
  MobileNavButton,
  MobileNavLinks,
  NavButton,
  NavContainer,
  NavLink,
  NavLinks,
  NavWrapper,
} from './styles'

interface HeaderProps {
  settings: SiteSettings
  navLinks: NavigationLink[]
}

const Header: FC<HeaderProps> = ({ settings, navLinks }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrollNav, setScrollNav] = useState<boolean>(false)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const navOnScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', navOnScroll)
    return () => {
      window.removeEventListener('scroll', navOnScroll)
    }
  }, [navOnScroll])

  return (
    <>
      <DropDown isOpen={isOpen} toggle={toggle} data={navLinks} settings={settings} />

      <NavContainer
        as="header"
        $scrollNav={scrollNav}
        role="banner"
      >
        <NavWrapper
          as="nav"
          role="navigation"
          aria-label="Main navigation"
        >
          <a
            href="#Feature"
            aria-label={`${settings.logo.text} - Go to top`}
          >
            <LogoText $scrollNav={scrollNav}>
              {settings.logo.text.split('Week')[0]}
              <span>Week</span>
            </LogoText>
          </a>

          <NavLinks>
            {navLinks.map((link, key) => (
              <div key={`nav-link-${key}-${link.title}`}>
                <NavLink href={link.url} $scrollNav={scrollNav}>
                  {link.title}
                </NavLink>
              </div>
            ))}

            <div>
              <NavButton
                href={settings.primaryCta.url}
                target={settings.primaryCta.openInNewTab ? '_blank' : undefined}
                rel={settings.primaryCta.openInNewTab ? 'noopener noreferrer' : undefined}
              >
                {settings.primaryCta.text}
              </NavButton>
            </div>
          </NavLinks>

          <MobileMenuButton
            as="button"
            onClick={toggle}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <MenuBars $scrollNav={scrollNav} />
          </MobileMenuButton>

          {/* Bottom Navigation for Mobile */}
          <MobileNavLinks>
            {navLinks.slice(0, 2).map((link, key) => (
              <BottomNavItem
                key={`bottom-nav-${key}-${link.title}`}
                href={link.url}
              >
                {link.title}
              </BottomNavItem>
            ))}

            <MobileNavButton
              href={settings.primaryCta.url}
              target={settings.primaryCta.openInNewTab ? '_blank' : undefined}
              rel={settings.primaryCta.openInNewTab ? 'noopener noreferrer' : undefined}
            >
              Access
            </MobileNavButton>
          </MobileNavLinks>
        </NavWrapper>
      </NavContainer>
    </>
  )
}

export default Header
