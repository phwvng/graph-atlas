import React from 'react';
import {
  DomainContainer,
  DomainHeader,
  DomainContentWrapper,
  DomainContent,
  DatasetStatsContainer,
  DatasetStatCard,
  StatLabel,
  StatValue,
  ComplexityContainer,
  ComplexityCard,
  SourceContainer,
  SourceCard,
  TagWrapper,
  TagContainer,
  DomainTag
} from './DomainElements';

const DomainImage = ({ domain, onClick, view }) => {
  const generateTagColor = (tag) => {
    const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <DomainContainer id={domain.id} onClick={onClick} view={view}>
      <DomainHeader view={view}>{domain.title}</DomainHeader>

      <DomainContentWrapper view={view}>
        <DomainContent>
          {/* Dataset Stats Section */}
          <DatasetStatsContainer view={view}>
            <DatasetStatCard view={view}>
              <StatLabel>Nodes</StatLabel>
              <StatValue>{domain.n_nodes}</StatValue>
            </DatasetStatCard>
            <DatasetStatCard view={view}>
              <StatLabel>Edges</StatLabel>
              <StatValue>{domain.n_edges}</StatValue>
            </DatasetStatCard>
          </DatasetStatsContainer>

          {/* Complexity Stats Section */}
          <ComplexityContainer view={view}>
            <ComplexityCard view={view}>
              <StatLabel>Node Types</StatLabel>
              <StatValue>{domain.node_types}</StatValue>
            </ComplexityCard>
            <ComplexityCard view={view}>
              <StatLabel>Edge Types</StatLabel>
              <StatValue>{domain.edge_types}</StatValue>
            </ComplexityCard>
          </ComplexityContainer>

          {/* Source Section */}
          <SourceContainer>
            <SourceCard view={view}>
              <StatLabel>Source</StatLabel>
              <StatValue>{domain.source}</StatValue>
            </SourceCard>
          </SourceContainer>

          {/* Tags Section */}
          <TagWrapper>
            <TagContainer>
              {domain.tags && domain.tags.length > 0 ? (
                domain.tags.map((tag) => (
                  <DomainTag key={tag} color={generateTagColor(tag)}>
                    #{tag}
                  </DomainTag>
                ))
              ) : (
                <span style={{ opacity: 0 }}>#placeholder</span>
              )}
            </TagContainer>
          </TagWrapper>
        </DomainContent>
      </DomainContentWrapper>
    </DomainContainer>
  );
};

export default DomainImage;
