type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: Record<string, unknown>;
  error?: string;
}

function formatEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}]${entry.context ? ` [${entry.context}]` : ''} ${entry.message}`;
  if (entry.error) return `${base}\n${entry.error}`;
  return base;
}

function log(
  level: LogLevel,
  message: string,
  context?: string,
  data?: Record<string, unknown>,
  error?: unknown
) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    data,
    error:
      error instanceof Error ? error.stack : error ? String(error) : undefined,
  };

  const formatted = formatEntry(entry);

  switch (level) {
    case 'error':
      console.error(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    case 'debug':
      if (process.env.NODE_ENV === 'development') console.debug(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  info: (message: string, context?: string, data?: Record<string, unknown>) =>
    log('info', message, context, data),
  warn: (message: string, context?: string, data?: Record<string, unknown>) =>
    log('warn', message, context, data),
  error: (
    message: string,
    context?: string,
    data?: Record<string, unknown>,
    error?: unknown
  ) => log('error', message, context, data, error),
  debug: (message: string, context?: string, data?: Record<string, unknown>) =>
    log('debug', message, context, data),
};
