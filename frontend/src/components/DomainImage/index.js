import React from 'react';
import {
  DomainContainer,
  DomainHeader,
  DomainContentWrapper,
  DomainContent,
  StatsGrid,
  StatCard,
  IconWrapper,
  LabelValueWrapper,
  StatLabel,
  StatValue,
  SourceContainer,
  SourceCard,
  TagWrapper,
  TagContainer,
  DomainTag
} from './DomainElements';

import { FiCpu, FiShuffle, FiLayers, FiGitBranch, FiBookOpen } from 'react-icons/fi';

import { useView } from '../../viewContext';

const DomainImage = ({ domains, onClick }) => {
  const { view } = useView();

  const generateTagColor = (tag) => {
    const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <DomainContainer id={domains.id} onClick={onClick} view={view}>
      <DomainHeader>{domains.title}</DomainHeader>

      <DomainContentWrapper>
        <DomainContent>
          <StatsGrid>
            <StatCard view={view}>
              {!view && <StatLabel>Nodes</StatLabel>}
              <LabelValueWrapper>
                <IconWrapper color="#4db6ac" view={view}>
                  <FiCpu />
                </IconWrapper>
                <StatValue color="#4db6ac" view={view}>
                  {domains.n_nodes}
                </StatValue>
              </LabelValueWrapper>
            </StatCard>

            <StatCard view={view}>
              {!view && <StatLabel>Edges</StatLabel>}
              <LabelValueWrapper>
                <IconWrapper color="#81c784" view={view}>
                  <FiGitBranch />
                </IconWrapper>
                <StatValue color="#81c784" view={view}>
                  {domains.n_edges}
                </StatValue>
              </LabelValueWrapper>
            </StatCard>

            <StatCard view={view}>
              {!view && <StatLabel>Node Types</StatLabel>}
              <LabelValueWrapper>
                <IconWrapper color="#9575cd" view={view}>
                  <FiLayers />
                </IconWrapper>
                <StatValue color="#9575cd" view={view}>
                  {domains.node_types}
                </StatValue>
              </LabelValueWrapper>
            </StatCard>

            <StatCard view={view}>
              {!view && <StatLabel>Edge Types</StatLabel>}
              <LabelValueWrapper>
                <IconWrapper color="#7986cb" view={view}>
                  <FiShuffle />
                </IconWrapper>
                <StatValue color="#7986cb" view={view}>
                  {domains.edge_types}
                </StatValue>
              </LabelValueWrapper>
            </StatCard>
          </StatsGrid>

          <SourceContainer>
            <SourceCard>
              <FiBookOpen style={{ marginRight: 8 }} />
              <span>{domains.source}</span>
            </SourceCard>
          </SourceContainer>

          <TagWrapper>
            <TagContainer>
              {domains.tags && domains.tags.length > 0 ? (
                domains.tags.map((tag) => (
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
