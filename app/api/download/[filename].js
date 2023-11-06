// pages/api/download/[filename].js
import fs from 'fs';

export default async function handler(req, res) {
  const { filename } = req.query;

  // Define the file path based on the filename
  const filePath = `/path/to/uploaded/files/${filename}`; // Adjust the path

  // Set the Content-Type and Content-Disposition headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  await new Promise((resolve, reject) => {
    fileStream.on('end', () => {
      res.end();
      resolve();
    });
    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      reject(error);
    });
  });
}
