import { MenuIcon } from '@/components/icons'
import styled from 'styled-components'

interface NavContainerProps {
  $scrollNav: boolean
}

interface NavItemProps {
  $scrollNav: boolean
}

export const NavContainer = styled.header<NavContainerProps>`
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  max-width: 1200px;
  width: calc(100% - 80px);
  height: 70px;
  margin: 0 auto;
  background: var(--glass-surface-light);
  -webkit-backdrop-filter: var(--blur-lg);
  backdrop-filter: var(--blur-lg);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: calc(100% - 60px);
  }

  @media screen and (max-width: 768px) {
    top: 16px;
    width: calc(100% - 40px);
    height: 64px;
  }

  @media screen and (max-width: 480px) {
    top: 12px;
    width: calc(100% - 24px);
    height: 60px;
  }
`

export const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 100%;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 16px;
  }
`

export const LogoText = styled.h1<NavItemProps>`
  font-family: 'Moderat-Bold', sans-serif;
  font-size: 28px;
  font-weight: 900;
  color: #1a202c;
  text-decoration: none;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-shadow: 0 2px 8px rgba(31, 38, 135, 0.1);

  span {
    color: #667eea;
  }

  &:hover {
    transform: scale(1.02);

    span {
      color: #5a67d8;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  gap: 8px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavLink = styled.a<NavItemProps>`
  cursor: pointer;
  padding: 10px 16px;
  text-decoration: none;
  font-weight: 500;
  color: #1a202c;
  background: var(--glass-white);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  -webkit-backdrop-filter: var(--blur-sm);
  backdrop-filter: var(--blur-sm);
  font-size: 14px;

  &:hover {
    color: #667eea;
    background: var(--glass-white-medium);
    border-color: var(--border-glass-strong);
    box-shadow: var(--glow-purple);
    transform: translateY(-1px);
  }
`

export const NavButton = styled.a`
  border-radius: var(--radius-sm);
  font-weight: 500;
  background: var(--bg-gradient-secondary);
  white-space: nowrap;
  padding: 10px 20px;
  color: white;
  border: 1px solid var(--border-glass);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  box-shadow: var(--glow-purple);
  -webkit-backdrop-filter: var(--blur-sm);
  backdrop-filter: var(--blur-sm);

  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    transform: translateY(-2px);
    box-shadow: var(--glow-purple-strong);
  }
`

export const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: none;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`

export const MenuBars = styled(MenuIcon)<NavItemProps>`
  color: #1a202c;
  cursor: pointer;
  font-size: 2rem;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: var(--radius-full);
  background: var(--glass-white);
  border: 1px solid var(--border-glass);

  &:hover {
    transform: scale(1.1);
    color: #667eea;
    box-shadow: var(--glow-purple);
    background: var(--glass-white-medium);
  }
`
