import { HiclientPage } from './app.po';

describe('hiclient App', () => {
  let page: HiclientPage;

  beforeEach(() => {
    page = new HiclientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
