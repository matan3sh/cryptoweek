import { headerLinks } from '@/data'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import DropDown from '../DropDown/DropDown'
import {
  Logo,
  MenuBars,
  NavButton,
  NavContainer,
  NavLink,
  NavLinks,
  NavWrapper,
} from './styles'

const Header: FC = () => {
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
      <DropDown isOpen={isOpen} toggle={toggle} data={headerLinks} />
      <NavContainer $scrollNav={scrollNav}>
        <NavWrapper>
          <a href="#Feature">
            <Logo src="/static/images/header/logo.png" alt="Cryptoweek logo" />
          </a>
          <NavLinks>
            {headerLinks.map((link, key) => (
              <NavLink
                key={`nav-link-${key}-${link.title}`}
                href={link.link}
                $scrollNav={scrollNav}
              >
                {link.title}
              </NavLink>
            ))}
            <NavButton
              href="https://hopin.com/events/israel-crypto-week"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Early Access
            </NavButton>
          </NavLinks>
          <MenuBars onClick={toggle} $scrollNav={scrollNav} />
        </NavWrapper>
      </NavContainer>
    </>
  )
}

export default Header
