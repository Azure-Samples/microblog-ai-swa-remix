export default function ToneSelector({
  value,
  onChange,
}: {
  value: 'technical' | 'casual' | 'motivational';
  onChange: (tone: 'technical' | 'casual' | 'motivational') => void;
}) {
  const tones = [
    {
      value: 'technical',
      label: 'Technical',
      description: 'Professional and detailed approach',
    },
    {
      value: 'casual',
      label: 'Casual',
      description: 'Friendly and conversational style',
    },
    {
      value: 'motivational',
      label: 'Motivational',
      description: 'Inspiring and energetic tone',
    },
  ] as const;

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
        Select Tone of Voice
      </label>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {tones.map((tone) => (
          <button
            key={tone.value}
            type='button'
            onClick={() => onChange(tone.value)}
            className={`p-4 rounded-lg border transition-all duration-200 text-left
              ${
                value === tone.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
          >
            <div className='font-medium text-gray-900 dark:text-white'>
              {tone.label}
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              {tone.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
