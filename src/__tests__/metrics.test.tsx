import { render, screen } from 'utils/test-utils';

test('render metrics page', async () => {
  render('/metrics');

  await screen.findByRole('button', { name: 'Change theme' });

  expect(
    screen.getByRole('heading', { level: 1 }).textContent,
  ).toMatchInlineSnapshot(`"Metrics"`);
});
