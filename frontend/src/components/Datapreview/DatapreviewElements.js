import styled from 'styled-components';

// Overlay with subtle blur for depth
export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

// Modal container with toned-down shadow (no inset glow)
export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, #323232, #272727);
  padding: 40px 45px;
  width: 65%;
  max-width: 850px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  border-radius: 14px;
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.45);
  animation: fadeInScale 0.4s ease forwards;

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

// Header container (title + back button) using flexbox
export const PreviewHeader = styled.div`
  width: 100%;
  margin-bottom: 28px;
  display: flex;
  align-items: center;       
  justify-content: space-between;
`;

// Title styling
export const PreviewTitle = styled.h1`
  color: #FAFAFA;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1.1px;
  text-transform: capitalize;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
  margin: 0;
`;

// Back button styling
export const PreviewButton = styled.button`
  background: #03C988;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(3, 201, 136, 0.6);
  transition: background 0.25s ease, box-shadow 0.25s ease;
  white-space: nowrap;

  &:hover, &:focus {
    background: #029e6a;
    box-shadow: 0 5px 12px rgba(2, 158, 106, 0.8);
    outline: none;
  }
`;

// Content and description
export const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`;

export const PreviewDescription = styled.p`
  color: #ccc;
  font-size: 20px;
  max-width: 680px;
  line-height: 1.5;
  text-align: center;
  margin-top: 8px; /* Slightly increased for better spacing */
  font-weight: 400;
`;

export const TagWrapper = styled.div`
  margin-top: -10px;
  margin-bottom: -12px;
  width: 100%;
  display: flex;
  justify-content: center;
`;


export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px; /* Increased gap for better spacing */
  max-width: 680px;
  justify-content: center;
`;

export const DomainTag = styled.span`
  background-color: ${({ color }) => color};
  color: #fff;
  font-size: 16px;           /* smaller than before */
  font-weight: 600;
  padding: 8px 16px;        /* slightly smaller padding */
  border-radius: 24px;       /* still nicely rounded */
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ color }) => color};
    cursor: default;
  }
`;


// Metadata styles with subtle shadow and improved layout
export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 48%;
  background: #222;
  padding: 24px 26px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(3, 201, 136, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const MetadataItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

export const MetadataLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #efefef;
  font-size: 14px; /* bumped for consistency */
  font-weight: 600;
  flex-shrink: 0;
  min-width: 140px;
  text-transform: capitalize;

  svg {
    color: #03c988;
    font-size: 16px;
  }
`;

export const MetadataValue = styled.p`
  color: #9dbeb9;
  font-size: 15.5px; /* bumped for consistency */
  font-weight: 500;
  max-width: 65%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: right;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Guide container with matching style
export const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 48%;
  max-height: 320px;
  overflow-y: auto;
  background: #222;
  padding: 24px 26px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(3, 201, 136, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  scrollbar-width: thin;
  scrollbar-color: #03c988 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #03c988;
    border-radius: 5px;
  }
`;

export const GuideStep = styled.div`
  color: #a0cfc1;
  font-size: 18px; /* bumped for consistency */
  margin-bottom: 14px;
  line-height: 1.55;
  font-weight: 500;

  strong {
    color: #03c988;
  }
`;

// Wrapper to place metadata & guide side-by-side nicely
export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 28px;
  margin-top: 24px;
`;

// Download button styling with smooth corners and subtle shadows
export const DownloadButton = styled.button`
  background: #03c988;
  color: #fff;
  font-size: 20px;
  padding: 14px 26px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  margin-top: 38px;
  width: 100%;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(3, 201, 136, 0.35);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover, &:focus {
    background: #029e6a;
    box-shadow: 0 7px 18px rgba(2, 158, 106, 0.65);
    outline: none;
  }

  &:disabled {
    background: #444;
    color: #888;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.75;
    pointer-events: none;
  }
`;

// Download link wrapper with no underline & full width
export const DownloadLink = styled.a`
  display: block;
  width: 100%;
  text-decoration: none;
`;
