import React from 'react';
import Explore from '../components/Explore';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ExplorePage = () => {
  return (
    <>
      <Sidebar />
      <Navbar isNewPage={true} />
      <Explore />
    </>
  )
}

export default ExplorePage
