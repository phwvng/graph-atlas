import React, { useState, useEffect } from 'react';
import { ExploreContainer, DomainBox, FormContainer, SearchBar, SearchButton } from './ExploreElements';
import { domainImages } from '../DomainImage/data';
import DomainImage from '../DomainImage';
import { Nav, NavLogo } from '../Navbar/NavbarElements';
import Datapreview from '../Datapreview';


const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  }

  const [openDomainId, setOpenDomainId] = useState(false);
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
  {domainImages.map((domain) => (
    domain.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
      <div key={domain.id}>
        <DomainImage
          domain={domain}
          onClick={() => setOpenDomainId(domain.id)} // Set the specific domain ID
        />
        <Datapreview
          dataset={domain}
          open={openDomainId === domain.id} // Check if this specific domain is open
          onClose={() => setOpenDomainId(null)} // Close it
        />
      </div>
    )
  ))}
</DomainBox>
</ExploreContainer>
</>
  )
}

export default Explore
