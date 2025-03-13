import React, { useState, useEffect } from 'react';
import Explore from '../components/Explore';
import useFetch from '../hooks/useFetch';

const ExplorePage = () => {
  const [domainImages, setDomainImages] = useState([]);
  const { data } = useFetch('/graph-api');

  useEffect(() => {
    if (data && data.graphs) {
      setDomainImages(data.graphs);
    }
  }, [data]);
  return (
    <>
      <Explore domainImages={domainImages} />
    </>
  );
};

export default ExplorePage;
