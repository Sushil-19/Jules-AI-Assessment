import { parseLog } from '../logParser';
import fs from 'node:fs/promises';

interface VisitorLog {
  [date: string]: Set<string>; 
}

export const getUniqueVisitorsPerDay = async (): Promise<VisitorLog> => {
  const data = await fs.readFile('log-generator/access.log', { encoding: 'utf8' });
  const lines = data.split('\n');
  const uniqueVisitorsPerDay: VisitorLog = {};

  for (const line of lines) {
    const parsedLog = parseLog(line);
    if (parsedLog) {
      // const date = parsedLog.Timestamp.toISOSting().split('T')[0]
      const date = parsedLog.Timestamp.toLocaleDateString('en-CA');
      if (!uniqueVisitorsPerDay[date]) {
        uniqueVisitorsPerDay[date] = new Set<string>();
      }
      uniqueVisitorsPerDay[date].add(parsedLog.IP_Address);
    }
  }

  return uniqueVisitorsPerDay;
};
