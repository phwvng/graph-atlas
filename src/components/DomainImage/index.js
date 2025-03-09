import React from 'react';
import { DomainContainer, DomainHeader, DomainImageContainer, DomainImg, DomainContent, DatasetSize, DatasetComplexity, DomainTag , DatasetSource, TagContainer, DataValue, Label } from './DomainElements';



const generateTagColor = (tag) => {
  const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360; // Create a color based on hue
  return `hsl(${hue}, 70%, 60%)`; // HSL color format
};


const DomainData = ({ label, data }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Label>{label}: </Label>
      <DataValue>{data}</DataValue>
    </div>
  );
};

const DomainImage = ( { domain, onClick } ) => {
  return (
    <>
      <DomainContainer id={domain.id} onClick={onClick}>
        
        <DomainHeader>{domain.title}</DomainHeader>
        <DomainImageContainer>
          <DomainImg src={domain.url} alt={domain.alt} />
        </DomainImageContainer>

        <DomainContent>
      <DatasetSize>
        <DomainData label="Size" data={domain.size} />
      </DatasetSize>

      <DatasetComplexity>
        <DomainData label="Complexity" data={domain.complexity} />
      </DatasetComplexity>

      <DatasetSource>
        <DomainData label="Source" data={domain.source} />
      </DatasetSource>

        <TagContainer>
          {domain.tags.map((tag) => (<DomainTag key={tag} color={generateTagColor(tag)}>#{tag}</DomainTag>))}
          </TagContainer>
        </DomainContent>

      </DomainContainer> 
    </>
  )
}

export default DomainImage
