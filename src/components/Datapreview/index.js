import React from 'react';
import { Overlay, PreviewButton, PreviewContainer, PreviewHeader, PreviewTitle, PreviewSubtitle, PreviewContent, PreviewImage, PreviewDescription } from './DatapreviewElements';
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
    </PreviewContainer>
    </>,
    document.getElementById('portal')
  );
};

export default Datapreview;
