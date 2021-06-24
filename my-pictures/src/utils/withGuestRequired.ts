import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { TOKEN_COOKIE_KEY } from '../contexts/auth';

type GetSSPDecorator<P = {}> = (
  func: GetServerSideProps<P>
) => GetServerSideProps<P>;

export const withGuestRequired: GetSSPDecorator = func => {
  return async ctx => {
    const cookies = parseCookies(ctx);

    const token = cookies[TOKEN_COOKIE_KEY];

    if (token) {
      return {
        redirect: {
          permanent: false,
          destination: '/albums',
        },
      };
    }

    return await func(ctx);
  };
};
