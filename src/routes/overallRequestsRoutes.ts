import express from 'express';
import { getOverallRequests } from '../controllers/overallRequestsController';

const router = express.Router();

router.get('/overall-requests', async (req, res) => {
  const totalRequests = await getOverallRequests();
  res.json({ totalRequests });
});

export default router;
