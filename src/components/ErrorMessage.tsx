import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  // Show additional help for API connection issues
  const isApiError = message.includes('Network error') || message.includes('Failed to connect');
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
      <p className="text-red-600 text-center mb-4 max-w-md">{message}</p>
      {isApiError && (
        <div className="text-sm text-red-500 text-center mb-4 max-w-md bg-red-100 p-3 rounded">
          <p className="font-medium mb-1">API Connection Issue</p>
          <p>This appears to be a static deployment. The backend API server is not available in this environment.</p>
        </div>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;