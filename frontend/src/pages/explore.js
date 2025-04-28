import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Use useLocation for URL tracking
import Explore from '../components/Explore';
import useFetch from '../hooks/useFetch';
import Filter from '../components/Filter';
import { Layout, Sidebar, MainContent, ContentWrapper, UploadButton } from '../components/Layout';
import { Nav, NavLogo } from '../components/Navbar/NavbarElements';
import Upload from '../components/UploadForm';

const ExplorePage = () => {
  const { data } = useFetch('https://graph-atlas.onrender.com/graph-api');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // To track the current URL
  const [open, setOpen] = useState(false);

  // Open upload modal when navigate to '/explore/upload'
  useEffect(() => {
    if (location.pathname === '/explore/upload') {
      setOpen(true); // Open upload form if we're on the upload route
    } else {
      setOpen(false); // Close the upload form if we're not on the upload route
    }
  }, [location.pathname]);

  const uploadButtonClick = () => {
    navigate('/explore/upload'); // This navigates and opens the Upload form
  }

  const onClose = () => {
    navigate('/explore'); // Navigates back to explore page
  }

  useEffect(() => {
    if (data) {
      setFilteredData(data);  // Initialize filtered data
    }
  }, [data]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Memoize the filteredData to prevent unnecessary re-renders in Explore
  const stableFilteredData = useMemo(() => filteredData, [filteredData]);

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
            domains={data || []}  // Pass original data for filtering
            onFilterChange={setFilteredData}  // Update filtered data
          />
        </Sidebar>
        <MainContent>
          <Explore domainImages={stableFilteredData} /> {/* Pass stable data */}
        </MainContent>
      </ContentWrapper>

      {open && <Upload open={open} onClose={onClose} />} {/* Conditionally render Upload */}
    </Layout>
  );
};

export default ExplorePage;
