import { Link } from '@remix-run/react';

export default function CTAButton({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className='inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full 
        shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 group'
    >
      {children}
      <svg
        className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 7l5 5m0 0l-5 5m5-5H6'
        />
      </svg>
    </Link>
  );
}
