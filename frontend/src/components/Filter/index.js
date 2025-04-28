// Filter.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  FilterBox,
  FilterH1,
  CollapseButton,
  ExpandButton,
  FilterTitle,
  FilterOptions,
  FilterItemContainer,
  FilterItem,
  Label,
  Divider,
  AmountLabel
} from './FilterElements';

const Filter = ({ checkCollapse, onClick, domains, onFilterChange, currentFiltered }) => {
  // Local state for checkboxes
  const [selectedDomains, setSelectedDomains] = useState({});
  const [selectedSources, setSelectedSources] = useState({});

  const handleDomainChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDomains(prev => ({ ...prev, [name]: checked }));
  };

  const handleSourceChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSources(prev => ({ ...prev, [name]: checked }));
  };

  const updateFilters = useCallback(() => {
    const activeDomainFilters = Object.keys(selectedDomains).filter(key => selectedDomains[key]);
    const activeSourceFilters = Object.keys(selectedSources).filter(key => selectedSources[key]);

    let filtered = domains;

    if (activeDomainFilters.length > 0) {
      filtered = filtered.filter(item => activeDomainFilters.includes(item.title));
    }

    if (activeSourceFilters.length > 0) {
      filtered = filtered.filter(item => activeSourceFilters.includes(item.source));
    }

    if (onFilterChange) {
      onFilterChange(filtered);
    }
  }, [selectedDomains, selectedSources, domains, onFilterChange]);

  // Update filters when selections change
  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  // Group counts based on the currently visible graphs (currentFiltered)
  const groupCounts = (items, keyName) => {
    const counts = items.reduce((acc, item) => {
      const key = item[keyName];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([key, count]) => ({ [keyName]: key, count }));
  };

  const domainList = groupCounts(currentFiltered, "title");
  const sourceList = groupCounts(currentFiltered, "source");

  return (
    <FilterBox>
      {checkCollapse ? (
        <ExpandButton onClick={onClick} />
      ) : (
        <CollapseButton onClick={onClick} />
      )}

      <FilterH1>Filters</FilterH1>
      <Divider />

      <FilterTitle>Domain</FilterTitle>
      <FilterOptions>
        {domainList.map((domain, index) => (
          <FilterItemContainer key={index} isCollapsed={checkCollapse}>
            <Label htmlFor={domain.title} isCollapsed={checkCollapse}>
              {domain.title}
            </Label>
            <FilterItem
              type="checkbox"
              id={domain.title}
              name={domain.title}
              checked={!!selectedDomains[domain.title]}
              onChange={handleDomainChange}
            />
            <AmountLabel>({domain.count})</AmountLabel>
          </FilterItemContainer>
        ))}
      </FilterOptions>

      <Divider />

      <FilterTitle>Source</FilterTitle>
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
    </FilterBox>
  );
};

export default Filter;
