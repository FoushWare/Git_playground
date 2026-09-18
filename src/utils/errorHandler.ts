export class AppError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: Error): void {
  console.error('Application error:', error.message);
  // Additional error handling logic
}