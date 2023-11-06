import multer from 'multer';
import nextConnect from 'next-connect';
import { insertPDFFile } from '../../db/database';

const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
});

apiRoute.use(upload.single('pdf'));

apiRoute.post(async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded.' });
      return;
    }

    // Save the PDF file to your server and get its path
    const filePath = req.file.path;

    // Get the PDF file name from the original file name
    const name = req.file.originalname;

    // Save file information to the database
    const result = await insertPDFFile(name, filePath);

    res.status(200).json({
      message: 'PDF uploaded successfully',
      fileId: result.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to save file information in the database' });
  }
});

export default apiRoute;
