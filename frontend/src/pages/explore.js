import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Explore from '../components/Explore';
import Filter from '../components/Filter';
import { Layout, Sidebar, MainContent, ContentWrapper, UploadButton } from '../components/Layout';
import { Nav, NavLogo } from '../components/Navbar/NavbarElements';
import Upload from '../components/UploadForm';

const ExplorePage = () => {
  const [graphTitles, setGraphTitles] = useState([]);
  const [fullGraphs, setFullGraphs] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

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

  const stableFilteredData = useMemo(() => fullGraphs, [fullGraphs]);

  // Main fetching logic
  useEffect(() => {
    async function fetchGraphs() {
      try {
        // Step 1: Fetch list of graph metadata (titles)
        const res = await fetch('https://graph-atlas.onrender.com/graphs');
        const titlesData = await res.json();
        setGraphTitles(titlesData);

        // Step 2: For each title, fetch the full statistics
        const fetchFullStats = titlesData.map((graph) =>
          fetch(`https://graph-atlas.onrender.com/graphs/${encodeURIComponent(graph.title)}`)
            .then((res) => res.json())
        );

        // Step 3: Wait for all fetches to finish
        const allGraphs = await Promise.all(fetchFullStats);
        setFullGraphs(allGraphs);
      } catch (error) {
        console.error('Error fetching graphs:', error);
      }
    }

    fetchGraphs();
  }, []);

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
            domains={fullGraphs || []}
            onFilterChange={setFullGraphs}
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
