import { parseLog } from '../logParser';
import fs from 'node:fs/promises';

export const getNotFoundFiles = async (): Promise<string[]> => {
  const data = await fs.readFile('log-generator/access.log', { encoding: 'utf8' });
  const lines = data.split('\n');
  const notFoundFiles: string[] = [];

  for (const line of lines) {
    const parsedLog = parseLog(line);
    if (parsedLog && parsedLog.HTTP_Status_Code === 404) {
      const filePath = parsedLog.HTTP_Request.split(' ')[1];
      notFoundFiles.push(filePath);
    }
  }

  return notFoundFiles;
};
