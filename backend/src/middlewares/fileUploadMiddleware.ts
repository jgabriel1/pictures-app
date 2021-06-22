import { v4 as uuid } from 'uuid';
import path from 'path';
import multer from 'multer';
import config from '../config';

export const fileUploadMiddleware = (fieldName: string) => {
  const upload = multer({
    ...config.upload,
    storage: multer.diskStorage({
      destination: config.tempFolder,
      filename: (_, file, callback) => {
        const mimetype = path.extname(file.originalname);
        const uniqueName = uuid();

        return callback(null, `${uniqueName}${mimetype}`);
      },
    }),
  });

  return upload.single(fieldName);
};
