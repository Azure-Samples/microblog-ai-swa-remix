import { CheckIcon } from '@heroicons/react/24/outline';

export default function SuccessNotification() {
  return (
    <div
      className='fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 
      rounded-lg shadow-lg flex items-center space-x-2 animate-slide-up'
    >
      <CheckIcon className='w-5 h-5' />
      <span>Content generated successfully!</span>
    </div>
  );
}
