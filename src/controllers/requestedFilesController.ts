import { parseLog } from '../logParser';
import fs from 'node:fs/promises';

export const getRequestedFiles = async (): Promise<Map<string, number>> => {
  const data = await fs.readFile('log-generator/access.log', { encoding: 'utf8' });
  const lines = data.split('\n');
  const fileMap = new Map<string, number>();

  for (const line of lines) {
    const parsedLog = parseLog(line);
    if (parsedLog) {
      const filePath = parsedLog.HTTP_Request.split(' ')[1];
      fileMap.set(filePath, (fileMap.get(filePath) || 0) + 1);
    }
  }

  return fileMap;
};
