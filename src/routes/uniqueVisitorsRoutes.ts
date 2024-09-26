import express from 'express';
import { getUniqueVisitors } from '../controllers/uniqueVisitorsController';

const router = express.Router();

router.get('/unique-visitors', async (req, res) => {
  const uniqueVisitors = await getUniqueVisitors();
  res.json({ uniqueVisitors: Array.from(uniqueVisitors) });
});

export default router;
