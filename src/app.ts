import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getOverallRequests } from './controllers/overallRequestsController';
import { getUniqueVisitorsPerDay } from './controllers/uniqueVisitorsController';
import { getRequestedFiles } from './controllers/requestedFilesController';
import { getNotFoundFiles } from './controllers/notFoundFilesController';

function respondWithJSON(res: ServerResponse, data: object) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export const app = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/overall-requests' && req.method === 'GET') {
    // Task 1
    const totalRequests = await getOverallRequests();
    respondWithJSON(res, { totalRequests });
  } else if (req.url === '/api/unique-visitors' && req.method === 'GET') {
    // Task 2
    const uniqueVisitors = await getUniqueVisitorsPerDay();
    const visitorsPerDay = Object.fromEntries(
    Object.entries(uniqueVisitors).map(([date, ipSet]) => [date, Array.from(ipSet)]));
    respondWithJSON(res, { uniqueVisitors: visitorsPerDay });
  } else if (req.url === '/api/requested-files' && req.method === 'GET') {
    // Task 3
    const requestedFiles = await getRequestedFiles();
    respondWithJSON(res, { requestedFiles: Object.fromEntries(requestedFiles) });
  } else if (req.url === '/api/404-files' && req.method === 'GET') {
    // Task 4
    const notFoundFiles = await getNotFoundFiles();
    respondWithJSON(res, { notFoundFiles });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});
