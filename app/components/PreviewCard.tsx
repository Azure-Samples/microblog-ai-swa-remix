import { SparklesIcon } from '@heroicons/react/24/outline';

export default function PreviewCard() {
  return (
    <div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
        Example Output Preview
      </h3>
      <div className='space-y-6'>
        <div className='prose dark:prose-invert max-w-none'>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Technical Tone:
          </span>
          <blockquote className='mt-2 text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4'>
            "Exploring the latest developments in #AI: Recent breakthroughs in
            large language models demonstrate significant improvements in
            natural language understanding..."
          </blockquote>
        </div>

        {/* Linha separadora */}
        <hr className='border-blue-200 dark:border-blue-800' />

        <div className='mt-4'>
          <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Your generated content will include:
          </p>
          <ul className='mt-2 space-y-3'>
            {[
              'Optimized hashtag suggestions',
              'Engagement-focused writing style',
              'Trend analysis insights',
            ].map((feature, index) => (
              <li
                key={index}
                className='flex items-center text-sm text-gray-600 dark:text-gray-400'
              >
                <SparklesIcon className='w-4 h-4 text-blue-500 mr-2 flex-shrink-0' />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
