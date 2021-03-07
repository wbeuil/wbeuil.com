import {
  setCookie,
  destroyCookie,
  parseCookies,
  BASE_COOKIE_OPTIONS,
} from 'utils/cookies';

test('everything about cookie', () => {
  const value = 'bar';
  setCookie(null, 'foo', value, BASE_COOKIE_OPTIONS);
  expect(parseCookies(null, BASE_COOKIE_OPTIONS).foo).toBe(value);
  destroyCookie(null, 'foo', BASE_COOKIE_OPTIONS);
  expect(parseCookies(null, BASE_COOKIE_OPTIONS).foo).toBeUndefined();
});
