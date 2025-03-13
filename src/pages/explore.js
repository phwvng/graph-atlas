import React, { useState, useEffect } from 'react';
import Explore from '../components/Explore';
import useFetch from '../hooks/useFetch';

const ExplorePage = () => {
  const [domainImages, setDomainImages] = useState([]);
  const { data } = useFetch('/graph-api');

  useEffect(() => {
    console.log(data)
    if (data) {
      console.log(data)
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
