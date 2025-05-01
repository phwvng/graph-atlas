import styled from 'styled-components';

// Fullscreen dark overlay
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

// Modal container
export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #2c2c2c;
  padding: 40px;
  width: 60%;
  max-width: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95) translate(-50%, -50%);
    }
    to {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
  }
`;

// Back button
export const PreviewButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #01BF71;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background: #028c52;
  }
`;

// Title and header
export const PreviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const PreviewTitle = styled.h1`
  color: #fff;
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;
  text-transform: capitalize;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
`;

// Preview image and description
export const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const PreviewDescription = styled.p`
  color: #a6a6a6;
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin-bottom: 20px;
  line-height: 1.6;
`;

// Metadata section
export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  background: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

export const MetadataItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const MetadataLabel = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const MetadataValue = styled.p`
  color: #a6a6a6;
  font-size: 16px;
`;

// CTA button
export const DownloadButton = styled.button`
  background: #01BF71;
  color: #fff;
  font-size: 18px;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 30px;
  width: 100%;
  text-align: center;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #028c52;
  }
`;
export const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  max-height: 300px; /* same as Metadata height or adjustable */
  overflow-y: auto;
  background: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  scrollbar-width: thin;
  scrollbar-color: #01BF71 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #01BF71;
    border-radius: 3px;
  }
`;

export const GuideStep = styled.div`
  color: #a6a6a6;
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 1.5;
`;
