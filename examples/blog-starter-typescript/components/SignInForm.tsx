import { useState } from 'react';
import Router from 'next/router';

import { Button } from './button';
import { VALID_AUTH_TOKEN } from '../lib/constants';

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
        You must be logged in to read this post
      </h2>
      <form
        className='mt-8 space-y-6'
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);

          if (email.trim() && password.trim()) {
            try {
              // Process fake login and reset the page
              await authWithEmailAndPassword(email, password);
              const d = new Date();
              const expDays = 15;
              d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
              let expires = 'expires=' + d.toUTCString();
              document.cookie =
                'authToken=' + VALID_AUTH_TOKEN + ';' + expires + ';path=/';
              Router.reload();
            } catch (e) {
              console.error('Login failed');
              alert('Login failed');
            }
          }

          setSubmitting(false);
        }}
      >
        <input type='hidden' name='remember' value='true' />
        <div className='rounded-md shadow-sm -space-y-px'>
          <div>
            <label htmlFor='email-address' className='sr-only'>
              Email address
            </label>
            <input
              id='email-address'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            disabled={submitting}
            type='submit'
            label='Sign In'
            style={{ opacity: submitting ? 0.2 : 1 }}
          />
        </div>
      </form>
    </>
  );
};

const authWithEmailAndPassword = (
  email: string,
  password: string
): Promise<boolean> => {
  const VALID_EMAIL = 'hiPolar@FEtask.com';
  const VALID_PSW = '1q2w3e4r5t';

  // Fake authorization response
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (
        email.toLowerCase() === VALID_EMAIL.toLocaleLowerCase() &&
        password === VALID_PSW
      ) {
        res(true);
      }

      rej(new Error('Authorization failed'));
    }, 1000);
  });
};
