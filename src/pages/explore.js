import React, { useState, useEffect, useMemo } from 'react';
import Explore from '../components/Explore';
import useFetch from '../hooks/useFetch';
import Filter from '../components/Filter';
import { Layout, Sidebar, MainContent, ContentWrapper } from '../components/Layout';
import { Nav, NavLogo } from '../components/Navbar/NavbarElements';

const ExplorePage = () => {
  const { data } = useFetch('/graph-api');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);  // Initialize filtered data
    }
  }, [data]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // 🟢 Memoize the filteredData to prevent unnecessary re-renders in Explore
  const stableFilteredData = useMemo(() => filteredData, [filteredData]);

  return (
    <Layout>
      <Nav style={{ background: "rgb(1, 191, 113)", flexShrink: 0 }}>
        <NavLogo to="/">GraphAtlas <i className="fa-solid fa-hexagon-nodes"></i></NavLogo>
      </Nav>
      <ContentWrapper>
        <Sidebar isCollapsed={isCollapsed}>
          <Filter
            checkCollapse={isCollapsed}
            onClick={toggleCollapse}
            domains={data || []}  // Pass original data for filtering
            onFilterChange={setFilteredData}  // Update filtered data
          />
        </Sidebar>
        <MainContent>
          <Explore domainImages={stableFilteredData} /> {/* Pass stable data */}
        </MainContent>
      </ContentWrapper>
    </Layout>
  );
};

export default ExplorePage;
