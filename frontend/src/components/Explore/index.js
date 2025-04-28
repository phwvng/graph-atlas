import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useView } from '../../viewContext';
import {
  ExploreContainer,
  DomainBox,
  FormContainer,
  SearchBar,
  SearchButton,
  Divider,
  ChangeViewContainer,
  GridView,
  ListView,
  SortBy,
  SortByOption,
  SortText,
  SortWrapper,
  SpinnerWrapper,
  SpinnerCircle,  // Import the spinner components here
} from './ExploreElements';
import DomainImage from '../DomainImage';
import Datapreview from '../Datapreview';

const Explore = ({ domainImages }) => {
  const { view, setView } = useView();
  const [sortOption, setSortOption] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const { domainId } = useParams();
  const [openDomainId, setOpenDomainId] = useState(null);

  useMemo(() => {
    setOpenDomainId(domainId || null);
  }, [domainId]);

  const sortedDomainImages = useMemo(() => {
    if (!domainImages || domainImages.length === 0) return [];

    const sortFunctions = {
      name: (a, b) => a.title.localeCompare(b.title),
      nodes: (a, b) => (b.n_nodes || 0) - (a.n_nodes || 0),
      edges: (a, b) => (b.n_edges || 0) - (a.n_edges || 0),
    };

    return [...domainImages].sort(sortFunctions[sortOption]);
  }, [domainImages, sortOption]);

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

      <FormContainer>
        <SearchBar
          type="text"
          placeholder="Search for a dataset..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton>Search</SearchButton>
      </FormContainer>

      <ChangeViewContainer>
        <GridView onClick={() => setView(true)} isGrid={view} />
        <ListView onClick={() => setView(false)} isGrid={view} />
      </ChangeViewContainer>

      <Divider />

      <DomainBox isGrid={view}>
        {domainImages.length === 0 ? ( // Check if no images are loaded
          <SpinnerWrapper> {/* Show spinner if no data */}
            <SpinnerCircle />
          </SpinnerWrapper>
        ) : (
          sortedDomainImages
            .filter((domain) =>
              domain.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((domain) => (
              <React.Fragment key={domain.id}>
                <DomainImage
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
  );
};

export default Explore;
