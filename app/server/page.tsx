'use client';
import { useState } from 'react';

export function UploadForm() {
  const [file, setFile] = useState<File>();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // Add the uploaded file to the list
      setUploadedFiles((prevFiles) => [...prevFiles, file.name]);

      // Clear the selected file
      setFile(undefined);
    } catch (e: any) {
      console.error(e);
    }
  };

  const downloadFile = async (fileName: string) => {
    try {
      // Send a GET request to download the file
      const res = await fetch(`/api/download?fileName=${fileName}`, {
        method: 'GET', // Ensure that you explicitly use the GET method
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // Create a temporary anchor element to trigger the download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
      </form>

      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((fileName) => (
              <li key={fileName}>
                {fileName}
                <button onClick={() => downloadFile(fileName)}>Download</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
