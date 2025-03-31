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



const DomainImage = ( { domain, onClick, view } ) => {

  const generateTagColor = (tag) => {
    const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360; // Create a color based on hue
    return `hsl(${hue}, 70%, 60%)`; // HSL color format
  };
  
  return (
      <DomainContainer id={domain.id} onClick={onClick} view={view}>
        
        <DomainImageContainer>
          <DomainImg src={require(`../../images/movies.svg`).default} alt='' />
        </DomainImageContainer>

        <DomainHeader>{domain.title}</DomainHeader>

        <DomainContent>
      <DatasetSize>
        <DomainData label="Size" data={`Nodes: ${domain.n_nodes} Edges: ${domain.n_edges}`} />
      </DatasetSize>

      <DatasetComplexity>
        <DomainData label="Complexity" data={`Node types: ${domain.node_types} Edge types: ${domain.edge_types}`} />
      </DatasetComplexity>

      <DatasetSource>
        <DomainData label="Source" data={domain.source} />
      </DatasetSource>

        {/* <TagContainer>
          {domain.tags.map((tag) => (<DomainTag key={tag} color={generateTagColor(tag)}>#{tag}</DomainTag>))}
          </TagContainer> */}
        </DomainContent>

      </DomainContainer> 
  )
}

export default DomainImage
