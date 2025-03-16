import React from 'react';
import { DomainContainer, DomainHeader, DomainImageContainer, DomainImg, DomainContent, DatasetSize, DatasetComplexity, DomainTag , DatasetSource, TagContainer, DataValue, Label } from './DomainElements';


const DomainData = ({ label, data }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Label>{label}: </Label>
      <DataValue>{data}</DataValue>
    </div>
  );
};



const DomainImage = ( { domain, onClick } ) => {

  const generateTagColor = (tag) => {
    const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360; // Create a color based on hue
    return `hsl(${hue}, 70%, 60%)`; // HSL color format
  };
  
  return (
    <>
      <DomainContainer id={domain.graph_type} onClick={onClick}>
        
        <DomainHeader>{domain.is_directed_int}</DomainHeader>
        <DomainImageContainer>
          <DomainImg src='' alt='' />
        </DomainImageContainer>

        <DomainContent>
      <DatasetSize>
        <DomainData label="Size" data='3' />
      </DatasetSize>

      <DatasetComplexity>
        <DomainData label="Complexity" data='Simple' />
      </DatasetComplexity>

      <DatasetSource>
        <DomainData label="Source" data='Facebook' />
      </DatasetSource>

        {/* <TagContainer>
          {domain.tags.map((tag) => (<DomainTag key={tag} color={generateTagColor(tag)}>#{tag}</DomainTag>))}
          </TagContainer> */}
        </DomainContent>

      </DomainContainer> 
    </>
  )
}

export default DomainImage
