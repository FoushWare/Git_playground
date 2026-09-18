export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export function log(level: LogLevel, message: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`, data || '');
}

export function logInfo(message: string, data?: any) {
  log(LogLevel.INFO, message, data);
}

export function logError(message: string, data?: any) {
  log(LogLevel.ERROR, message, data);
}