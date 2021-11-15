import styled from 'styled-components';
import { MenuIcon } from 'components/icons';

export const NavContainer = styled.header`
  position: fixed;
  /* max-width: 1620px; */
  width: 100%;
  margin: auto;
  left: 0;
  right: 0;
  height: ${({ scrollNav }) => (scrollNav ? '70px' : '100px')};
  background: ${({ scrollNav }) => (scrollNav ? 'white' : 'transparent')};
  background: ${({ scrollNav }) =>
    scrollNav && '0 0px 8px 0 rgba(31, 38, 135, 0.22)'};
  color: black;
  transition: 0.3s ease-in;
  z-index: 100;
`;

export const NavWrapper = styled.nav`
  width: 1620px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  @media screen and (max-width: 1820px) {
    width: 95%;
  }
`;

export const Logo = styled.img`
  object-fit: contain;
  transform: translateX(80px);
  @media screen and (max-width: 860px) {
    transform: translateX(10px);
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 75px;
  font-size: 18px;
  padding-right: 25px;
  @media screen and (max-width: 1684px) {
    padding-right: 75px;
  }
  @media screen and (max-width: 1220px) {
    padding-right: 25px;
  }
  @media screen and (max-width: 1095px) {
    gap: 50px;
  }
  @media screen and (max-width: 1010px) {
    gap: 35px;
  }
  @media screen and (max-width: 815px) {
    font-size: 16px;
  }
  @media screen and (max-width: 860px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  transition: 0.3s ease-in;
  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
  }
`;

export const NavButton = styled.a`
  font-size: 18px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
  span {
    background: #3d68ff;
    background: -webkit-linear-gradient(
      to right,
      #3d68ff 42%,
      #966be2 62%,
      #e27b73 88%
    );
    background: -moz-linear-gradient(
      to right,
      #3d68ff 42%,
      #966be2 62%,
      #e27b73 88%
    );
    background: linear-gradient(
      to right,
      #3d68ff 42%,
      #966be2 62%,
      #e27b73 88%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const MenuBars = styled(MenuIcon)`
  display: none !important;
  cursor: pointer;

  @media screen and (max-width: 860px) {
    display: block !important;
    transform: translate(-30px, -3px);
  }
  @media screen and (max-width: 420px) {
    transform: translate(-25px, 0px);
  }
  @media screen and (max-width: 420px) {
    transform: translate(-25px, -5px);
  }
  @media screen and (max-width: 320px) {
    transform: translate(-15px, -5px);
  }
`;
