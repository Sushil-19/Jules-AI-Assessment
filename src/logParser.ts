export interface LogEntry {
  IP_Address: string;
  Timestamp: Date;
  Remote_User: string; 
  Authenticated_User: string; 
  HTTP_Request: string;
  HTTP_Status_Code: number;
  Response_Size: number;
  Referer: string;
  User_Agent: string;
}


// 217.83.56.208 - - [05/Oct/2024:22:59:57 +0000] "GET /search/tag/list HTTP/1.0" 200 5046 
// "https://www.scott-gonzales.com/tags/posts/terms/" "Mozilla/5.0 (Macintosh; PPC Mac OS X 10_5_9)
//  AppleWebKit/534.0 (KHTML, like Gecko) Chrome/45.0.833.0 Safari/534.0"
export function parseLog(logLine: string): LogEntry | null {
  const Regex = /^(.*?) (.*?) (.*?) \[(.*?)\] "(.*?)" (\d{3}) (\d+) "(.*?)" "(.*?)"$/;
  const match = logLine.match(Regex);
  
  if (match) {
    const [_, ip, remoteUser, authenticatedUser, timestamp, request, status, size, referer, userAgent] = match;

    const RemoteUser = remoteUser === '-' ? 'unknown' : remoteUser;
    const AuthenticatedUser = authenticatedUser === '-' ? 'unknown' : authenticatedUser; 

    const logEntry: LogEntry = {
      IP_Address: ip,
      Remote_User: RemoteUser,
      Authenticated_User: AuthenticatedUser,
      Timestamp: new Date(timestamp.replace(/:/, ' ')),
      HTTP_Request: request,
      HTTP_Status_Code: parseInt(status),
      Response_Size: parseInt(size),
      Referer: referer,
      User_Agent: userAgent,
    };

    console.log(logEntry); 

    return logEntry;
  }

  return null;
}
