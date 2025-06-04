import React from 'react';
import ReactDom from 'react-dom';
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
  DownloadLink
} from './DatapreviewElements';

import {
  TagWrapper,
  TagContainer,
  DomainTag
} from '../DomainImage/DomainElements';

// Tag color generator
const generateTagColor = (tag) => {
  const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const Datapreview = ({ dataset, open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <Overlay />
      <PreviewContainer>
        <PreviewButton onClick={onClose}>Back</PreviewButton>

        <PreviewHeader>
          <PreviewTitle>{dataset.title}</PreviewTitle>
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
              <MetadataLabel>Nodes</MetadataLabel>
              <MetadataValue>{dataset.n_nodes}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Edges</MetadataLabel>
              <MetadataValue>{dataset.n_edges}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Node types</MetadataLabel>
              <MetadataValue>{dataset.node_types}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Edge types</MetadataLabel>
              <MetadataValue>{dataset.edge_types}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Assortativity</MetadataLabel>
              <MetadataValue>{dataset.assortativity}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Density</MetadataLabel>
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
          <DownloadLink href={dataset.file_url} download target="_blank" rel="noopener noreferrer">
            <DownloadButton>Download Dataset</DownloadButton>
          </DownloadLink>
        ) : (
          <DownloadButton disabled>No Download Available</DownloadButton>
        )}
      </PreviewContainer>
    </>,
    document.getElementById('portal')
  );
};

export default Datapreview;
