import React, { useState, useEffect } from 'react';
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

const Filter = ({ checkCollapse, onClick, domains, onFilterChange }) => {
  // Reusable function to group counts by a given key.
  const groupCounts = (items, keyName) =>
    Object.entries(
      items.reduce((acc, item) => {
        const key = item[keyName];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {})
    ).map(([key, count]) => ({ [keyName]: key, count }));

  // Generate grouped lists for domains and sources.
  const domainList = groupCounts(domains, "title");
  const sourceList = groupCounts(domains, "source");

  // Local state for checkbox selections.
  const [selectedDomains, setSelectedDomains] = useState({});
  const [selectedSources, setSelectedSources] = useState({});

  // Function to update filtered datasets based on selected filters.
  const updateFilters = () => {
    // Get the active filter keys.
    const activeDomainFilters = Object.keys(selectedDomains).filter(key => selectedDomains[key]);
    const activeSourceFilters = Object.keys(selectedSources).filter(key => selectedSources[key]);

    // Filter datasets: if no filters are active for a category, include all.
    let filtered = domains;
    if (activeDomainFilters.length > 0) {
      filtered = filtered.filter(item => activeDomainFilters.includes(item.title));
    }
    if (activeSourceFilters.length > 0) {
      filtered = filtered.filter(item => activeSourceFilters.includes(item.source));
    }

    // Send the filtered data back to the parent.
    if (onFilterChange) {
      onFilterChange(filtered);
    }
  };

  // Handle change for domain checkboxes.
  const handleDomainChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDomains(prev => ({ ...prev, [name]: checked }));
  };

  // Handle change for source checkboxes.
  const handleSourceChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSources(prev => ({ ...prev, [name]: checked }));
  };

  // Update filters whenever selections change.
  useEffect(() => {
    updateFilters();
  }, [selectedDomains, selectedSources, domains]);

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
