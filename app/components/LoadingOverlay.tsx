import { SparklesIcon } from '@heroicons/react/24/outline';

export default function LoadingOverlay() {
  return (
    <div
      className='fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm 
      flex items-center justify-center z-50'
    >
      <div
        className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl 
        flex items-center space-x-4'
      >
        <SparklesIcon className='w-6 h-6 text-blue-500 animate-spin' />
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-gray-900 dark:text-white'>
            Generating Your Content
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            This might take a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
