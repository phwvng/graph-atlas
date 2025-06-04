import React from 'react';
import ReactDOM from 'react-dom';
import {
  Overlay,
  PreviewButton,
  PreviewContainer,
  PreviewHeader,
  PreviewTitle,
  PreviewContent,
  PreviewDescription,
  Metadata,
  MetadataItem,
  MetadataLabel,
  MetadataValue,
  DownloadButton,
  GuideContainer,
  GuideStep,
  InfoRow,
  DownloadLink,
  TagWrapper,
  TagContainer,
  DomainTag
} from './DatapreviewElements';


import {
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiShuffle,
  FiBarChart2,
  FiActivity
} from 'react-icons/fi';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Tag color generator
const generateTagColor = (tag) => {
  const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const Datapreview = ({ dataset, open, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <PreviewContainer>
        <PreviewHeader>
          <PreviewTitle>{dataset.title}</PreviewTitle>
          <PreviewButton onClick={onClose}>Back</PreviewButton>
        </PreviewHeader>

        <PreviewContent>
          <PreviewDescription>{dataset.description}</PreviewDescription>

          {/* Tag Section */}
          {dataset.tags && dataset.tags.length > 0 && (
            <TagWrapper>
              <TagContainer>
                {dataset.tags.map((tag, idx) => (
                  <DomainTag key={idx} color={generateTagColor(tag)}>
                    #{tag}
                  </DomainTag>
                ))}
              </TagContainer>
            </TagWrapper>
          )}
        </PreviewContent>

        {/* Metadata & Guide side-by-side */}
        <InfoRow>
          <Metadata>
            <MetadataItem>
              <MetadataLabel
                data-tooltip-id="tooltip"
                data-tooltip-content="Total number of nodes in the graph"
              >
                <FiCpu /> Nodes
              </MetadataLabel>
              <MetadataValue>{dataset.n_nodes}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel
                data-tooltip-id="tooltip"
                data-tooltip-content="Total number of edges connecting nodes"
              >
                <FiGitBranch /> Edges
              </MetadataLabel>
              <MetadataValue>{dataset.n_edges}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel
                data-tooltip-id="tooltip"
                data-tooltip-content="Distinct types or classes of nodes"
              >
                <FiLayers /> Node types
              </MetadataLabel>
              <MetadataValue>{dataset.node_types}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel
                data-tooltip-id="tooltip"
                data-tooltip-content="Different kinds of relationships between nodes"
              >
                <FiShuffle /> Edge types
              </MetadataLabel>
              <MetadataValue>{dataset.edge_types}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel
                data-tooltip-id="tooltip"
                data-tooltip-content="Tendency for nodes to connect to similar nodes"
              >
                <FiBarChart2 /> Assortativity
              </MetadataLabel>
              <MetadataValue>{dataset.assortativity}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel
                data-tooltip-id="tooltip"
                data-tooltip-content="Proportion of possible edges that exist"
              >
                <FiActivity /> Density
              </MetadataLabel>
              <MetadataValue>{dataset.density}</MetadataValue>
            </MetadataItem>
          </Metadata>

          <GuideContainer>
            {dataset.guide && dataset.guide.length > 0 ? (
              dataset.guide.map((step, index) => (
                <GuideStep key={index}>
                  <strong>Step {index + 1}:</strong> {step}
                </GuideStep>
              ))
            ) : (
              <GuideStep>No guide available.</GuideStep>
            )}
          </GuideContainer>
        </InfoRow>

        {/* Download button with file_url check */}
        {dataset.file_url ? (
          <DownloadLink
            href={dataset.file_url}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadButton>Download Dataset</DownloadButton>
          </DownloadLink>
        ) : (
          <DownloadButton disabled>No Download Available</DownloadButton>
        )}
      </PreviewContainer>

      {/* Tooltip */}
      <Tooltip
        id="tooltip"
        place="top"
        style={{ fontSize: '13px', zIndex: 2000 }}
      />
    </>,
    document.getElementById('portal')
  );
};

export default Datapreview;
