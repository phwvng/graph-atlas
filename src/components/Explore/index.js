import React, { useState, useEffect } from 'react';
import { ExploreContainer, DomainBox, FormContainer, SearchBar, SearchButton } from './ExploreElements';
import DomainImage from '../DomainImage';
import { Nav, NavLogo } from '../Navbar/NavbarElements';
import Datapreview from '../Datapreview';
import { useNavigate, useParams } from 'react-router-dom';

const Explore = ( { domainImages } ) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  }

  const navigate = useNavigate();
  const { domainId } = useParams(); // Get the domain ID from the URL
  const [openDomainId, setOpenDomainId] = useState(null);
  useEffect(() => {
    setOpenDomainId(domainId || null);
  }, [domainId]);


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
         {(domainImages === null ? <h1>Loading...</h1> :
        domainImages.map((domain) => (
          domain.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
            <React.Fragment key={domain.id}>
              <DomainImage
                domain={domain}
                onClick={() => navigate(`/explore/domains/${domain.id}`)} // Update URL on click
              />
              <Datapreview
                dataset={domain}
                open={openDomainId === domain.id}
                onClose={() => navigate("/explore")} // Reset URL on close
              />
            </React.Fragment>
          ))))}
     </DomainBox>
</ExploreContainer>
</>
  )
}

export default Explore
