import { PropsWithoutRef } from 'react';

interface IButton extends PropsWithoutRef<JSX.IntrinsicElements['button']> {
  label: string;
}

export const Button: React.FC<IButton> = ({ label, ...props }) => (
  <button
    {...props}
    className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  >
    {label}
  </button>
);
