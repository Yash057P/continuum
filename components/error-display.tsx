interface ErrorDisplayProps {
  error: Error | string;
  title?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  error,
  title = "Error",
  onRetry,
}: ErrorDisplayProps) {
  const errorMessage = typeof error === "string" ? error : error.message;

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{errorMessage}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
