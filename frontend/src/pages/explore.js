// ExplorePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Explore from '../components/Explore';
import Filter from '../components/Filter';
import { Layout, Sidebar, MainContent, ContentWrapper, UploadButton } from '../components/Layout';
import { Nav, NavLogo } from '../components/Navbar/NavbarElements';
import Upload from '../components/UploadForm';

const ExplorePage = () => {
  const [fullGraphs, setFullGraphs] = useState([]);       // original full dataset
  const [filteredGraphs, setFilteredGraphs] = useState([]); // filtered view
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/explore/upload') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location.pathname]);

  const uploadButtonClick = () => {
    navigate('/explore/upload');
  };

  const onClose = () => {
    navigate('/explore');
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Fetch all graphs
  useEffect(() => {
    async function fetchGraphs() {
      try {
        const res = await fetch('https://graph-atlas.onrender.com/graphs');
        const titlesData = await res.json();

        const fetchFullStats = titlesData.map((graph) =>
          fetch(`https://graph-atlas.onrender.com/graphs/${encodeURIComponent(graph.title)}`)
            .then((res) => res.json())
        );

        const allGraphs = await Promise.all(fetchFullStats);
        setFullGraphs(allGraphs);
        setFilteredGraphs(allGraphs); // initially, all graphs are shown
      } catch (error) {
        console.error('Error fetching graphs:', error);
      }
    }

    fetchGraphs();
  }, []);

  // Memoized filtered graphs to avoid unnecessary rerenders
  const stableFilteredData = useMemo(() => filteredGraphs, [filteredGraphs]);

  return (
    <Layout>
      <Nav style={{ background: "rgb(1, 191, 113)", flexShrink: 0 }}>
        <NavLogo to="/">GraphAtlas <i className="fa-solid fa-hexagon-nodes"></i></NavLogo>
        <UploadButton onClick={uploadButtonClick} />
      </Nav>

      <ContentWrapper>
        <Sidebar isCollapsed={isCollapsed}>
          <Filter
            checkCollapse={isCollapsed}
            onClick={toggleCollapse}
            domains={fullGraphs}  // always give the full unfiltered graphs
            onFilterChange={setFilteredGraphs}  // updates filteredGraphs
            currentFiltered={filteredGraphs}    // pass the current view
          />
        </Sidebar>
        <MainContent>
          <Explore domainImages={stableFilteredData} />
        </MainContent>
      </ContentWrapper>

      {open && <Upload open={open} onClose={onClose} />}
    </Layout>
  );
};

export default ExplorePage;
