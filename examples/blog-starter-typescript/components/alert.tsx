import Router from 'next/router';

import Container from './container';
import cn from 'classnames';
import { EXAMPLE_PATH } from '../lib/constants';
import { withAuthorization, WithAuthProps } from '../HOC/withAuthorization';

interface IAlert extends WithAuthProps {
  preview?: boolean;
};

const Alert = ({ preview, isLoggedIn }: IAlert) => (
  <div
    className={cn('border-b', {
      'bg-accent-7 border-accent-7 text-white': preview,
      'bg-accent-1 border-accent-2': !preview,
    })}
  >
    <Container>
      <div className='py-2 text-center text-sm'>
        {preview ? (
          <>
            This page is a preview.{' '}
            <a
              href='/api/exit-preview'
              className='underline hover:text-cyan duration-200 transition-colors'
            >
              Click here
            </a>{' '}
            to exit preview mode.
          </>
        ) : (
          <>
            The source code for this blog is{' '}
            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className='underline hover:text-success duration-200 transition-colors'
            >
              available on GitHub
            </a>
            .
          </>
        )}
        {isLoggedIn && (
          <a
            href='!#'
            className='float-right'
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              logout();
              Router.reload();
            }}
          >
            Logout
          </a>
        )}
      </div>
    </Container>
  </div>
);

export default withAuthorization(Alert);

const logout = (): void => {
  // Set cookie expired to delete it and reload the page
  document.cookie =
    'authToken=' + ';path=/' + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
};
