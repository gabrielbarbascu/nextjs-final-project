'use client';
import { saveAs } from 'file-saver';
import React from 'react';

interface DownloadButtonProps {
  secureUrl: string | undefined;
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  secureUrl,
  fileName,
}) => {
  const handleDownloadClick = () => {
    if (secureUrl) {
      // If there is a secureUrl, trigger download
      saveAs(secureUrl, fileName || 'service');
    } else {
      // If no secureUrl, log an error or handle it as needed
      console.error('No secureUrl available for download.');
    }
  };

  return <button onClick={handleDownloadClick}>Download File</button>;
};

export default DownloadButton;
