import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
  return (
    <div
      className="flex h-64 items-center justify-center"
    >
      <div className="flex flex-col items-center space-y-4">
        <FaSpinner className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-gray-600 dark:text-gray-300 text-sm">Loading post...</p>
      </div>
    </div>
  );
}
