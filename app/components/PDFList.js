import React, { useEffect, useState } from 'react';
import { getAllPDFFiles } from '../db/database';

function PDFList() {
  const [pdfFiles, setPDFFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded PDF files when the component mounts
    async function fetchPDFFiles() {
      try {
        const response = await getAllPDFFiles();
        setPDFFiles(response);
      } catch (error) {
        console.error('Error fetching PDF files:', error);
      }
    }

    fetchPDFFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded PDF Files</h2>
      <ul>
        {pdfFiles.map((file) => (
          <li key={file.id}>
            <a href={`/api/pdf/${file.id}`} download={file.name}>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PDFList;
