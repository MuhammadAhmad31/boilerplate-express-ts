import multer from "multer";

const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

import { Request } from "express";
import { FileFilterCallback } from "multer";

interface MulterFile {
  originalname: string;
}

const fileFilter = (req: Request, file: MulterFile, cb: FileFilterCallback) => {
  const fileExtension = file.originalname.split(".").pop()?.toLowerCase();

  if (fileExtension && allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: fileFilter,
});
