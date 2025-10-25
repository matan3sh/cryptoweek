import { getNavigationLinks, getSiteSettings } from '@/lib/content/static'
import { AnimatePresence, motion } from 'framer-motion'
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

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrollNav, setScrollNav] = useState<boolean>(false)

  // Load content from content layer
  const settings = getSiteSettings()
  const navLinks = getNavigationLinks()

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
      <AnimatePresence>
        <DropDown isOpen={isOpen} toggle={toggle} data={navLinks} />
      </AnimatePresence>

      <NavContainer
        as={motion.header}
        $scrollNav={scrollNav}
        role="banner"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          backgroundColor: scrollNav
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.1)',
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <NavWrapper
          as={motion.nav}
          role="navigation"
          aria-label="Main navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.a
            href="#Feature"
            aria-label={`${settings.logo.text} - Go to top`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <LogoText
              as={motion.h1}
              $scrollNav={scrollNav}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {settings.logo.text.split('Week')[0]}
              <span>Week</span>
            </LogoText>
          </motion.a>

          <NavLinks
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {navLinks.map((link, key) => (
              <motion.div
                key={`nav-link-${key}-${link.title}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5 + key * 0.1,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <NavLink href={link.url} $scrollNav={scrollNav}>
                  {link.title}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <NavButton
                href={settings.primaryCta.url}
                target={settings.primaryCta.openInNewTab ? '_blank' : undefined}
                rel={settings.primaryCta.openInNewTab ? 'noopener noreferrer' : undefined}
              >
                {settings.primaryCta.text}
              </NavButton>
            </motion.div>
          </NavLinks>

          <MobileMenuButton
            as={motion.button}
            onClick={toggle}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <MenuBars $scrollNav={scrollNav} />
          </MobileMenuButton>

          {/* Bottom Navigation for Mobile */}
          <MobileNavLinks
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {navLinks.slice(0, 2).map((link, key) => (
              <BottomNavItem
                key={`bottom-nav-${key}-${link.title}`}
                href={link.url}
                as={motion.a}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5 + key * 0.1,
                  duration: 0.4,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {link.title}
              </BottomNavItem>
            ))}

            <MobileNavButton
              href={settings.primaryCta.url}
              target={settings.primaryCta.openInNewTab ? '_blank' : undefined}
              rel={settings.primaryCta.openInNewTab ? 'noopener noreferrer' : undefined}
              as={motion.a}
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {settings.primaryCta.text}
            </MobileNavButton>
          </MobileNavLinks>
        </NavWrapper>
      </NavContainer>
    </>
  )
}

export default Header
