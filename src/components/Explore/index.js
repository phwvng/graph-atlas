import React, { useState, useEffect } from 'react';
import { ExploreContainer, DomainBox, FormContainer, SearchBar, SearchButton } from './ExploreElements';
import { domainImages } from '../DomainImage/data';
import DomainImage from '../DomainImage';
import { Nav, NavLogo } from '../Navbar/NavbarElements';


const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  }
  // const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //  if (!searchQuery.trim()) {
  //     return;
  //   }
  //   const results = [...domainImages].filter((domain) =>
  //     domain.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setSearchResults(results);

  //   setSearchQuery('');
  // };

  return (
    <>
      <Nav style={{background: '#0c0c0c'}}>
          <NavLogo to="/">
          GraphAtlas <i className="fa-solid fa-hexagon-nodes"></i>
          </NavLogo>
      </Nav>
      <ExploreContainer>
        <FormContainer onSubmit={handleSearch}>
          <SearchBar
            type="text"
            placeholder="Search for a domain"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value
            )}
          />
          <SearchButton type="submit">Search</SearchButton>
        </FormContainer>

    <DomainBox>
    {
domainImages.map((domain) => (
        <DomainImage key={domain.id} domain={domain} />
      ))
}
</DomainBox>
</ExploreContainer>
</>
  )
}

export default Explore
