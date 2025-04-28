import styled from 'styled-components';

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #1f1f1f;
  border-radius: 8px;
  width: 80%;
  max-width: 600px; 
  margin: 20px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  position: fixed;
  top: 50%;
  left: 30%;
  transform: translateY(-50%);
  
`;

export const ReturnButton = styled.button`
  background-color: #5c5c5c;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 20px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1002;
  &:hover {
    background-color: #8b8b8b;
  }
  &:disabled {
    background-color: #808080;
    cursor: not-allowed;
  }
`;

export const UploadTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`;

export const UploadForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UploadDropArea = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #5c5c5c;
  background-color: #2c2c2c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  color: #b0b0b0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #404040;
  }

  p {
    font-size: 1rem;
  }
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  padding: 10px 20px;
  background-color: #5c5c5c;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8b8b8b;
  }

  &:disabled {
    background-color: #808080;
    cursor: not-allowed;
  }
`;

export const UploadDescription = styled.p`
  color: #a6a6a6;
  font-size: 0.9rem;
  margin-top: 15px;
  text-align: center;
`;

export const UploadProgressBar = styled.div`
  width: 100%;
  background-color: #5c5c5c;
  height: 10px;
  margin-top: 20px;
  border-radius: 5px;
`;

export const UploadProgressFill = styled.div`
  width: ${(props) => props.progress}%;
  background-color: #4caf50;
  height: 100%;
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
`;

export const UploadPreviewContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #2c2c2c;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UploadPreviewText = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 10px;
`;

export const UploadActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const UploadCancelButton = styled.button`
  padding: 8px 12px;
  background-color: #ff6666;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4d4d;
  }
`;

export const UploadDeleteButton = styled.button`
  padding: 8px 12px;
  background-color: #ffa500;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e68a00;
  }
`;
