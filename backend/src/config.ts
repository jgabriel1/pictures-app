import path from 'path';

const tempFolder = path.resolve(__dirname, '..', 'tmp');
const uploadsFolder = path.resolve(__dirname, '..', 'public', 'uploads');
const staticFolder = path.resolve(__dirname, '..', 'public');

export default {
  jwtSecret: 'jwtSecret',
  upload: { dest: tempFolder },
  tempFolder,
  uploadsFolder,
  staticFolder,
};
