import { newE2EPage } from '@stencil/core/testing';

describe('noti-tray', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<noti-tray></noti-tray>');

    const element = await page.find('noti-tray');
    expect(element).toHaveClass('hydrated');
  });
});
