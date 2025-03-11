import React from 'react';
import Explore from '../components/Explore';
import { useData } from '../contexts/DataContext';

const ExplorePage = () => {
  const domainImages = useData();

  return (
    <>
      <Explore domainImages={domainImages.graphs}/>
    </>
  )
}

export default ExplorePage
