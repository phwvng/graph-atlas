import React, { useState, useEffect } from 'react';
import Explore from '../components/Explore';
import useFetch from '../hooks/useFetch';
import Filter from '../components/Filter';
import { Layout, Sidebar, MainContent, ContentWrapper } from '../components/Layout';
import { Nav, NavLogo } from '../components/Navbar/NavbarElements';

const ExplorePage = () => {
  const [domainImages, setDomainImages] = useState([]);
  const { data } = useFetch('/graph-api');

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    console.log('Sidebar collapsed:', isCollapsed);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setDomainImages(data);
    }
  }, [data]);
  return (
    <Layout>
      <Nav
  style={{ background: "rgb(1, 191, 113)", flexShrink: 0 }}
>
      <NavLogo to="/">
        GraphAtlas <i className="fa-solid fa-hexagon-nodes"></i>
      </NavLogo>
    </Nav>
    <ContentWrapper>
      <Sidebar isCollapsed={isCollapsed}>
      <Filter checkCollapse={isCollapsed} onClick={toggleCollapse} />
      </Sidebar>
      <MainContent>
        <Explore domainImages={domainImages} />
      </MainContent>
    </ContentWrapper>
  </Layout>
  );
};

export default ExplorePage;
