import { useState, useEffect } from 'react';
import DropDown from '../DropDown/DropDown';
import { headerLinks } from 'data';
import {
  NavContainer,
  NavWrapper,
  Logo,
  NavLinks,
  NavLink,
  NavButton,
  MenuBars,
} from './styles';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const [scrollNav, setScrollNav] = useState(false);

  const navOnScroll = () => {
    const currentHeight = window.innerWidth <= 720 ? 5 : 120;
    if (window.scrollY >= currentHeight) {
      setScrollNav(true);
    } else setScrollNav(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', navOnScroll);
    return () => {
      window.removeEventListener('scroll', navOnScroll);
    };
  }, []);

  return (
    <>
      <DropDown isOpen={isOpen} toggle={toggle} data={headerLinks} />
      <NavContainer scrollNav={scrollNav}>
        <NavWrapper>
          <a href='#Feature'>
            <Logo
              src='/static/images/header/logo.png'
              alt='logo'
              width='168px'
              height='34px'
            />
          </a>
          <NavLinks>
            {headerLinks.map((link, key) => (
              <div key={key}>
                <NavLink href={link.link}>{link.title}</NavLink>
              </div>
            ))}
            <NavButton
              href='https://hopin.com/events/israel-crypto-week'
              target='_blank'
              rel='noopener noreferrer'>
              <span>Get Early Access</span>
            </NavButton>
          </NavLinks>
          <MenuBars onClick={toggle} />
        </NavWrapper>
      </NavContainer>
    </>
  );
};

export default Header;
