/**
 * @description This is a paywall component with the signin functionality
 *
 * nit: I thought to implement a "modal" right before the text content, but eventually
 *      chose an approach that resembles an implementation like in the Medium app
 *
 * @style - https://tailwindui.com/components/application-ui/forms/sign-in-forms
 * @returns React Component
 */

import { SignInForm } from './SignInForm';

const Paywall: React.FC = () => (
  <div className='min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8'>
    <div className='max-w-md w-full space-y-8'>
      <SignInForm />
    </div>
  </div>
);

export default Paywall;
