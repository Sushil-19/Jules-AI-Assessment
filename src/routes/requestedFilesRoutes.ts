import express from 'express';
import { getRequestedFiles } from '../controllers/requestedFilesController';

const router = express.Router();

router.get('/requested-files', async (req, res) => {
  const requestedFiles = await getRequestedFiles();
  res.json({ requestedFiles });
});

export default router;
