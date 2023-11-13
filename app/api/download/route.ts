import { readFile } from 'node:fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';

// Function to handle GET requests
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { fileName } = req.query; // Extract the file name from the query parameters

      const filePath = `/tmp/${fileName}`; // Define the file path

      // Check if the file exists
      try {
        await readFile(filePath);
      } catch (error) {
        res.status(404).json({ error: 'File not found' });
        return;
      }

      // Set the response headers for the download
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${fileName}"`,
      );
      res.setHeader('Content-Type', 'application/octet-stream');

      // Read the file and pipe it to the response
      const fileStream = await readFile(filePath);
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).json({ error: 'Failed to download the file.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed for non-GET requests
  }
};
