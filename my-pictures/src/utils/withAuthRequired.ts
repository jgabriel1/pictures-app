import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { TOKEN_COOKIE_KEY } from '../contexts/auth';

type GetSSPDecorator<P = {}> = (
  func: GetServerSideProps<P>
) => GetServerSideProps<P>;

export const withAuthRequired: GetSSPDecorator = func => {
  return async ctx => {
    const cookies = parseCookies(ctx);

    const token = cookies[TOKEN_COOKIE_KEY];

    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    return await func(ctx);
  };
};
