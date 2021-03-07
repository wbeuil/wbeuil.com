import { render, screen } from 'utils/test-utils';
import Home from 'pages/index';

test('render home page', () => {
  render(<Home />);
  expect(
    screen.getByRole('heading', { level: 1 }).textContent,
  ).toMatchInlineSnapshot(`"Hi there 👋, I'm William Beuil"`);
});
