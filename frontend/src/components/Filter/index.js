import React, { useState, useEffect, useCallback } from 'react';
import {
  FilterBox,
  FilterH1,
  CollapseButton,
  ExpandButton,
  FilterTitleWrapper,
  FilterTitle,
  FilterOptions,
  FilterItemContainer,
  FilterItem,
  Label,
  Divider,
  AmountLabel,
  DomainIcon,
  SourceIcon,
  ShowMoreButton,
  TagIcon
} from './FilterElements';

const Filter = ({ checkCollapse, onClick, domains, onFilterChange, currentFiltered }) => {
  const [selectedDomains, setSelectedDomains] = useState({});
  const [selectedSources, setSelectedSources] = useState({});
  const [selectedTags, setSelectedTags] = useState({});
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const handleDomainChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDomains(prev => ({ ...prev, [name]: checked }));
  };

  const handleSourceChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSources(prev => ({ ...prev, [name]: checked }));
  };

  const handleTagChange = (e) => {
    const { name, checked } = e.target;
    setSelectedTags(prev => ({ ...prev, [name]: checked }));
  };

  const updateFilters = useCallback(() => {
    const activeDomainFilters = Object.keys(selectedDomains).filter(key => selectedDomains[key]);
    const activeSourceFilters = Object.keys(selectedSources).filter(key => selectedSources[key]);
    const activeTagFilters = Object.keys(selectedTags).filter(key => selectedTags[key]);

    let filtered = domains;

    if (activeDomainFilters.length > 0) {
      filtered = filtered.filter(item => activeDomainFilters.includes(item.domain));
    }

    if (activeSourceFilters.length > 0) {
      filtered = filtered.filter(item => activeSourceFilters.includes(item.source));
    }

    if (activeTagFilters.length > 0) {
      // Since tags is an array, check if item.tags includes any active tag filter
      filtered = filtered.filter(item =>
        item.tags.some(tag => activeTagFilters.includes(tag))
      );
    }

    if (onFilterChange) {
      onFilterChange(filtered);
    }
  }, [selectedDomains, selectedSources, selectedTags, domains, onFilterChange]);

  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  const groupCounts = (items, keyName) => {
    const counts = items.reduce((acc, item) => {
      if (keyName === 'tags') {
        // For tags, flatten all arrays
        item.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      } else {
        const key = item[keyName];
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts).map(([key, count]) => ({ [keyName]: key, count }));
  };

  const domainList = groupCounts(currentFiltered, "domain");
  const sourceList = groupCounts(currentFiltered, "source");
  const tagList = groupCounts(currentFiltered, "tags");

  const displayedTags = tagsExpanded ? tagList : tagList.slice(0, 4);
  const toggleTags = () => setTagsExpanded(prev => !prev);

  return (
    <FilterBox>
      {checkCollapse ? (
        <ExpandButton onClick={onClick} />
      ) : (
        <CollapseButton onClick={onClick} />
      )}

      <FilterH1>Filters</FilterH1>
      <Divider />

      <FilterTitleWrapper>
        <DomainIcon size={18} color="#01bf71" />
        <FilterTitle>Domain</FilterTitle>
      </FilterTitleWrapper>
      <FilterOptions>
        {domainList.map((domain, index) => (
          <FilterItemContainer key={index} isCollapsed={checkCollapse}>
            <Label htmlFor={domain.domain} isCollapsed={checkCollapse}>
              {domain.domain}
            </Label>
            <FilterItem
              type="checkbox"
              id={domain.domain}
              name={domain.domain}
              checked={!!selectedDomains[domain.domain]}
              onChange={handleDomainChange}
            />
            <AmountLabel>({domain.count})</AmountLabel>
          </FilterItemContainer>
        ))}
      </FilterOptions>

      <Divider />

      <FilterTitleWrapper>
        <SourceIcon size={18} color="#01bf71" />
        <FilterTitle>Source</FilterTitle>
      </FilterTitleWrapper>
      <FilterOptions>
        {sourceList.map((sourceItem, index) => (
          <FilterItemContainer key={index} isCollapsed={checkCollapse}>
            <Label htmlFor={sourceItem.source} isCollapsed={checkCollapse}>
              {sourceItem.source}
            </Label>
            <FilterItem
              type="checkbox"
              id={sourceItem.source}
              name={sourceItem.source}
              checked={!!selectedSources[sourceItem.source]}
              onChange={handleSourceChange}
            />
            <AmountLabel>({sourceItem.count})</AmountLabel>
          </FilterItemContainer>
        ))}
      </FilterOptions>

      <Divider />

      <FilterTitleWrapper>
        <TagIcon size={18} color="#01bf71" />
        <FilterTitle>Tags</FilterTitle>
      </FilterTitleWrapper>
      <FilterOptions>
        {displayedTags.map((tag, index) => (
          <FilterItemContainer key={index} isCollapsed={checkCollapse}>
            <Label htmlFor={tag.tags} isCollapsed={checkCollapse}>
              {tag.tags}
            </Label>
            <FilterItem
              type="checkbox"
              id={tag.tags}
              name={tag.tags}
              checked={!!selectedTags[tag.tags]}
              onChange={handleTagChange}
            />
            <AmountLabel>({tag.count})</AmountLabel>
          </FilterItemContainer>
        ))}

        {tagList.length > 4 && (
          <ShowMoreButton onClick={toggleTags}>
            {tagsExpanded ? 'Show Less ▲' : 'Show More ▼'}
          </ShowMoreButton>
        )}
      </FilterOptions>
    </FilterBox>
  );
};

export default Filter;
