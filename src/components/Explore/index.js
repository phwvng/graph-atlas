import React, { useState, useEffect } from 'react';
import { ExploreContainer, DomainBox, FormContainer, SearchBar, SearchButton, Divider, ChangeViewContainer ,GridView, ListView } from './ExploreElements';
import DomainImage from '../DomainImage';
import Datapreview from '../Datapreview';
import { useNavigate, useParams } from 'react-router-dom';

const Explore = ( { domainImages } ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
  }

  const [gridView, setGridView] = useState(true);
  const handleGridView = () => {
    console.log("Grid View");
    setGridView(true);
  }
  const handleListView = () => {
    console.log("List View");
    setGridView(false);
  }
  const navigate = useNavigate();
  const { domainId } = useParams(); // Get the domain ID from the URL
  const [openDomainId, setOpenDomainId] = useState(null);
  useEffect(() => {
    setOpenDomainId(domainId || null);
  }, [domainId]);


  return (
    
      <ExploreContainer>
        <FormContainer onSubmit={handleSearch}>
          <SearchBar
            type="text"
            placeholder="Search for a dataset..."
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value
            )}
          />
          <SearchButton type="submit">Search</SearchButton>
        </FormContainer>
        <ChangeViewContainer>
            <GridView onClick={handleGridView} />
            <ListView onClick={handleListView}/>
          </ChangeViewContainer>

        <Divider />
        <DomainBox isGrid={gridView}>
         {(domainImages === null ? <h1>Loading...</h1> :
        domainImages.map((domain) => (
          domain.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
            <React.Fragment key={domain.id}>
              <DomainImage
                view = {gridView}
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
  )
}

export default Explore
