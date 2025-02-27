import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';
import { animateScroll as scroll } from 'react-scroll';

const Navbar = ({ toggle, isNewPage }) => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {
    if(window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }
  , []);


  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav scrollNav={scrollNav} isNewPage={isNewPage}> 
        <NavbarContainer>
            <NavLogo to='/' onClick={toggleHome}>
              GraphAtlas <i className="fa-solid fa-hexagon-nodes"></i>
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks to='about'
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact='true'
                  offset={0}
              >About</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='services'
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={0}
                >Services</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='submit-your-own'>Submit Your Own</NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to='/explore'>Explore</NavBtnLink>
            </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar