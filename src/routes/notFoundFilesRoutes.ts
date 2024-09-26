import express from 'express';
import { getNotFoundFiles } from '../controllers/notFoundFilesController';

const router = express.Router();

router.get('/404-files', async (req, res) => {
  const notFoundFiles = await getNotFoundFiles();
  res.json({ notFoundFiles });
});

export default router;
