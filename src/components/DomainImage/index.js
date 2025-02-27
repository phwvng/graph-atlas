import React from 'react';
import { DomainContainer, DomainHeader, DomainImageContainer, DomainImg, DomainContent, DatasetSize, DatasetComplexity, DatasetTags, DatasetSource } from './DomainElements';

const DomainImage = ( { domain } ) => {
  return (
    <>
      <DomainContainer id={domain.id}>
        <DomainHeader>{domain.title}</DomainHeader>
        <DomainImageContainer>
          <DomainImg src={domain.url} alt={domain.alt} />
        </DomainImageContainer>

        <DomainContent>
        <DatasetSize>{domain.size}</DatasetSize>
        <DatasetComplexity>{domain.complexity}</DatasetComplexity>
        <DatasetTags>{domain.tags}</DatasetTags>
        <DatasetSource>{domain.source}</DatasetSource>
        </DomainContent>
      </DomainContainer> 
    </>
  )
}

export default DomainImage
