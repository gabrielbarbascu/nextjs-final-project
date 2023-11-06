const db = require('./db-config');

async function insertPDFFile(name, filePath) {
  return await db.one(
    'INSERT INTO pdf_files(name, file_path) VALUES($1, $2) RETURNING id',
    [name, filePath],
  );
}

async function getAllPDFFiles() {
  return await db.any('SELECT * FROM pdf_files');
}

module.exports = {
  insertPDFFile,
  getAllPDFFiles,
};
