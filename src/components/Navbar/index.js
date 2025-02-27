import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';

const Navbar = ({ toggle }) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
            <NavLogo to='/'>
              GraphAtlas <i className="fa-solid fa-hexagon-nodes"></i>
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks to='about'>About</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='explore'>Services</NavLinks>
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