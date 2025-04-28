import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export const PreviewButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #01BF71;  // Primary green color
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background: #028c52;  // Darker green on hover
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #2c2c2c;  // Dark background similar to UploadForm
  padding: 40px;
  width: 60%;
  max-width: 800px;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const PreviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const PreviewTitle = styled.h1`
  color: #fff;  // White text for better contrast
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

export const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const PreviewDescription = styled.p`
  color: #a6a6a6;  // Light gray text for description
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: #2c2c2c;  // Dark background similar to UploadForm
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const MetadataItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

export const MetadataLabel = styled.p`
  color: #fff;  // White text for labels
  font-size: 16px;
  font-weight: bold;
`;

export const MetadataValue = styled.p`
  color: #a6a6a6;  // Light gray text for metadata values
  font-size: 16px;
`;

export const DownloadButton = styled.button`
  background: #01BF71;  // Primary green color
  color: #fff;
  font-size: 18px;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #028c52;  // Darker green on hover
  }
`;

export const ExpandButton = styled.button`
  background: transparent;
  color: #01BF71;  // Primary green color for text
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #028c52;  // Darker green on hover
  }
`;
