import React, { useState, useEffect } from 'react';
import { ExploreContainer, DomainBox, FormContainer, SearchBar, SearchButton, Divider, ChangeViewContainer, GridView, ListView, SortBy, SortByOption, SortText, SortWrapper } from './ExploreElements';
import DomainImage from '../DomainImage';
import Datapreview from '../Datapreview';
import { useNavigate, useParams } from 'react-router-dom';

const Explore = ( { domainImages } ) => {
const [sortOption, setSortOption] = useState('name');

const [sortedDomainImages, setSortedDomainImages] = useState(domainImages || []);

useEffect(() => {
  if (!domainImages || domainImages.length === 0) return;

  console.log('Before sorting:', domainImages);

  const sortFunctions = {
    name: (a, b) => a.title.localeCompare(b.title),
    nodes: (a, b) => (a.n_nodes?.length || 0) - (b.n_nodes?.length || 0),  // Ascending order
    edges: (a, b) => (a.n_edges?.length || 0) - (b.n_edges?.length || 0),  // Ascending order
  };

  const sorted = [...domainImages].sort(sortFunctions[sortOption]);
  console.log('After sorting:', sorted);

  setSortedDomainImages(sorted);
}, [domainImages, sortOption]);
  

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
        <SortWrapper>
        <SortText>Sort by:</SortText>
        <SortBy value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
      {["name", "nodes", "edges"].map((option) => (
        <SortByOption key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </SortByOption>
      ))}
    </SortBy>
        </SortWrapper>

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
            <GridView onClick={handleGridView} isGrid={gridView}/>
            <ListView onClick={handleListView} isGrid={gridView}/>
          </ChangeViewContainer>

        <Divider />
        <DomainBox isGrid={gridView}>
      {sortedDomainImages === null ? (
        <h1>Loading...</h1>
      ) : (
        sortedDomainImages
          .filter((domain) =>
            domain.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .map((domain) => (
            <React.Fragment key={domain.id}>
              <DomainImage
                view={gridView}
                domain={domain}
                onClick={() => navigate(`/explore/domains/${domain.id}`)}
              />
              <Datapreview
                dataset={domain}
                open={openDomainId === domain.id}
                onClose={() => navigate("/explore")}
              />
            </React.Fragment>
          ))
      )}
    </DomainBox>
</ExploreContainer>
  )
}

export default Explore
