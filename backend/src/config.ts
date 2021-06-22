import path from 'path';

const tempFolder = path.resolve(__dirname, '..', 'tmp');
const uploadsFolder = path.resolve(__dirname, '..', 'public', 'uploads');

export default {
  jwtSecret: 'jwtSecret',
  upload: { dest: tempFolder },
  tempFolder,
  uploadsFolder,
};
