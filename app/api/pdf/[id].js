import fs from 'fs';
import { getFileById } from '../../../db/database';

export default async (req, res) => {
  const { id } = req.query;

  try {
    // Fetch the file information from the database using the ID
    const file = await getFileById(id);

    if (!file) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    // Set the appropriate headers for the download
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Stream the file to the response
    const fileStream = fs.createReadStream(file.file_path);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving PDF file:', error);
    res.status(500).json({ error: 'Failed to serve PDF file' });
  }
};
