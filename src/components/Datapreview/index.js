import React from 'react';
import { Overlay, PreviewButton, PreviewContainer, PreviewHeader, PreviewTitle, PreviewContent, PreviewImage, PreviewDescription, Metadata, MetadataItem, MetadataLabel, MetadataValue, DownloadButton } from './DatapreviewElements';
import ReactDom from 'react-dom';

const Datapreview = ({ dataset, open, onClose  }) => {
  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
    <Overlay></Overlay>
    <PreviewContainer>
      <PreviewButton onClick={onClose}>Back</PreviewButton>
      <PreviewHeader>
        <PreviewTitle>{dataset.title}</PreviewTitle>
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
      <MetadataItem>
        <MetadataLabel>Node types</MetadataLabel>
        <MetadataValue>{dataset.node_types}</MetadataValue>
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
    <DownloadButton>Download Dataset</DownloadButton>

    </PreviewContainer>
    </>,
    document.getElementById('portal')
  );
};

export default Datapreview;
