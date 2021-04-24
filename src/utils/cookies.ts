export { setCookie, destroyCookie, parseCookies } from 'nookies';

export const BASE_COOKIE_OPTIONS = {
  path: '/',
  sameSite: 'None',
  secure: process.env.NODE_ENV !== 'test',
};
