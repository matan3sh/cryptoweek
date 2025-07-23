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
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${({ $scrollNav }) =>
    $scrollNav ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(20px);
  border-bottom: ${({ $scrollNav }) =>
    $scrollNav
      ? '1px solid rgba(226, 232, 240, 0.5)'
      : '1px solid rgba(255, 255, 255, 0.1)'};
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  align-items: center;
`

export const NavWrapper = styled.nav`
  max-width: 1620px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 100%;

  @media screen and (max-width: 1820px) {
    width: 95%;
    padding: 0 2.5%;
  }
`

export const LogoText = styled.h1<NavItemProps>`
  font-family: 'Moderat-Bold', sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: ${({ $scrollNav }) => ($scrollNav ? '#1a202c' : '#1a202c')};
  text-decoration: none;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

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
    font-size: 28px;
  }

  @media screen and (max-width: 520px) {
    font-size: 24px;
  }
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  gap: 32px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavLink = styled.a<NavItemProps>`
  cursor: pointer;
  padding: 12px 24px;
  text-decoration: none;
  font-weight: 500;
  color: ${({ $scrollNav }) => ($scrollNav ? '#2d3748' : '#1a202c')};
  background: ${({ $scrollNav }) =>
    $scrollNav ? 'transparent' : 'rgba(255, 255, 255, 0.15)'};
  border: 1px solid
    ${({ $scrollNav }) =>
      $scrollNav ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  font-size: 15px;

  &:hover {
    color: #667eea;
    background: ${({ $scrollNav }) =>
      $scrollNav ? 'rgba(102, 126, 234, 0.08)' : 'rgba(255, 255, 255, 0.25)'};
    border-color: ${({ $scrollNav }) =>
      $scrollNav ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.4)'};
    transform: translateY(-1px);
  }
`

export const NavButton = styled.a`
  border-radius: 12px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  white-space: nowrap;
  padding: 14px 28px;
  color: white;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  font-size: 15px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.25);

  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.35);
  }
`

export const MenuBars = styled(MenuIcon)<NavItemProps>`
  display: none;
  color: ${({ $scrollNav }) => ($scrollNav ? '#2d3748' : '#1a202c')};
  cursor: pointer;
  font-size: 2rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: #667eea;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }

  @media screen and (min-width: 769px) {
    display: none !important;
  }
`
