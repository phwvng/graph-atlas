import React, { useState } from 'react';
import { ExploreContainer, DomainBox, FormContainer, SearchBar, SearchButton } from './ExploreElements';
import { domainImages } from '../DomainImage/data';
import DomainImage from '../DomainImage';
import { Nav, NavLogo } from '../Navbar/NavbarElements';


const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ExploreContainer>
      <Nav style={{background: '#0c0c0c'}}>
          <NavLogo to="/">
          GraphAtlas <i className="fa-solid fa-hexagon-nodes"></i>
          </NavLogo>
      </Nav>
        <FormContainer onSubmit={handleSearch}>
          <SearchBar
            type="text"
            placeholder="Search for a domain"
            name="search"
          />
          <SearchButton type="submit">Search</SearchButton>
        </FormContainer>

    <DomainBox>
      {domainImages.map((domain) => (<DomainImage key={domain.id}  domain={domain} />
))};
</DomainBox>
</ExploreContainer>
    </>
  )
}

export default Explore
