import React from 'react';
import { Overlay, PreviewButton, PreviewContainer, PreviewHeader, PreviewTitle, PreviewSubtitle, PreviewContent, PreviewImage, PreviewDescription, Metadata, MetadataItem, MetadataLabel, MetadataValue } from './DatapreviewElements';
import ReactDom from 'react-dom';

const Datapreview = ({ dataset, open, onClose  }) => {
  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
    <Overlay></Overlay>
    <PreviewContainer>
      <PreviewButton onClick={onClose}>Close</PreviewButton>
      <PreviewHeader>
        <PreviewTitle>{dataset.title}</PreviewTitle>
        <PreviewSubtitle>{dataset.subtitle || 'No subtitle available'}</PreviewSubtitle>
      </PreviewHeader>
      <PreviewContent>
        <PreviewImage src={dataset.url} alt={dataset.title} />
        <PreviewDescription>{dataset.description}</PreviewDescription>
      </PreviewContent>
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
        <MetadataLabel>Edge types</MetadataLabel>
        <MetadataValue>{dataset.edge_types}</MetadataValue>
      </MetadataItem>
    </Metadata>
    </PreviewContainer>
    </>,
    document.getElementById('portal')
  );
};

export default Datapreview;
