import { logger } from './logger';

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  extra?: Record<string, unknown>;
}

function captureError(error: unknown, context?: ErrorContext) {
  const errorObj = error instanceof Error ? error : new Error(String(error));
  const contextStr = context
    ? `${context.component || 'unknown'}/${context.action || 'unknown'}`
    : 'unknown';

  logger.error(
    errorObj.message,
    contextStr,
    {
      ...context?.extra,
      userId: context?.userId,
      name: errorObj.name,
    },
    errorObj
  );

  if (process.env.NODE_ENV === 'production') {
    // Future: integrate with Sentry, Datadog, or similar
    // Sentry.captureException(error, { extra: context });
  }
}

function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: ErrorContext
) {
  const contextStr = context
    ? `${context.component || 'unknown'}/${context.action || 'unknown'}`
    : 'unknown';
  logger[level === 'warning' ? 'warn' : level](
    message,
    contextStr,
    context?.extra
  );
}

export const errorTracking = {
  captureError,
  captureMessage,
};
