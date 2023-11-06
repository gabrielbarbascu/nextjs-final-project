'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Validate that the uploaded file is a PDF (you can implement more robust validation)
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }

      setSelectedFile(file);
      onFileUpload(file);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf', // Limit accepted file types to PDF
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a PDF file here, or click to select one.</p>
      </div>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default FileUpload;
