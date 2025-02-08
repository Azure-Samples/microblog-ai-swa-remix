import CharacterCounter from './CharacterCounter';

export default function EnhancedTextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  maxLength,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700 dark:text-gray-200'
        >
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
        {maxLength && <CharacterCounter text={value} maxLength={maxLength} />}
      </div>
      <input
        type='text'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
          focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
      />
    </div>
  );
}
