import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  UploadContainer,
  UploadTitle,
  UploadForm,
  UploadInput,
  UploadButton,
  UploadDropArea,
  UploadDescription,
  UploadProgressBar,
  UploadProgressFill,
  UploadPreviewContainer,
  UploadPreviewText,
  UploadActions,
  UploadCancelButton,
  UploadDeleteButton,
  ReturnButton
} from './UploadElements';
import { Overlay } from '../Datapreview/DatapreviewElements';

const Upload = ({ open, onClose }) => { // Destructure `open` and `onClose` from props
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate(); // Initialize navigate from react-router-dom

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  if (!open) {
    return null; // Return null to not render the component if `open` is false
  }

  return ReactDom.createPortal(
    <>
      <Overlay/> 
      <UploadContainer>
        <ReturnButton onClick={() => { 
          onClose(); 
          navigate('/explore'); // Navigate back when returning
        }}>
          Back
        </ReturnButton>
        <UploadTitle>Upload Your Dataset</UploadTitle>
        <UploadForm>
          <UploadDropArea>
            <p>Drag & Drop files here or click to upload</p>
            <UploadInput type="file" onChange={handleFileChange} />
          </UploadDropArea>
          <UploadButton disabled={!file}>Upload</UploadButton>
        </UploadForm>
        <UploadDescription>Supported formats: .graphml, .csv</UploadDescription>
        {uploading && (
          <UploadProgressBar>
            <UploadProgressFill progress={progress} />
          </UploadProgressBar>
        )}
        {file && (
          <UploadPreviewContainer>
            <UploadPreviewText>{file.name}</UploadPreviewText>
            <UploadActions>
              <UploadCancelButton onClick={() => { 
                onClose(); 
                navigate('/explore'); // Navigate back when canceling
              }}>Cancel</UploadCancelButton>
              <UploadDeleteButton>Delete</UploadDeleteButton>
            </UploadActions>
          </UploadPreviewContainer>
        )}
      </UploadContainer>
    </>,
    document.getElementById('portal')
  );
};

export default Upload;
