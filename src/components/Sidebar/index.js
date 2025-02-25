import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements'

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
    <SidebarWrapper>
        <SidebarMenu>
            <SidebarLink to='about' onClick={toggle}>About</SidebarLink>
            <SidebarLink to='explore' onClick={toggle}>Explore</SidebarLink>
            <SidebarLink to='submit-your-own' onClick={toggle}>Submit Your Own</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
            <SidebarRoute to='/signin'>Sign In</SidebarRoute>
        </SideBtnWrap>
    </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
