import multer from "multer";

// Disk storage (local upload)
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Memory storage (CDN case)
const memoryStorage = multer.memoryStorage();

const storage = (req) => {
  const useCDN = process.env.USE_CDN === "true";
  return useCDN ? memoryStorage : diskStorage;
};

export const upload = multer({
  storage: {
    _handleFile(req, file, cb) {
      const chosenStorage = storage(req);
      chosenStorage._handleFile(req, file, cb);
    },
    _removeFile(req, file, cb) {
      const chosenStorage = storage(req);
      chosenStorage._removeFile(req, file, cb);
    },
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});
