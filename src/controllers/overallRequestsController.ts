import { parseLog } from '../logParser';
import fs from 'node:fs/promises';

export const getOverallRequests = async (): Promise<number> => {
  const data = await fs.readFile('log-generator/access.log', { encoding: 'utf8' });
  const lines = data.split('\n');
  var totalRequests = 0;
  
  for (const line of lines) {
    if (parseLog(line)) totalRequests++;
  }
  
  return totalRequests;
};
