import { Context } from '@nuxt/types';

import redirectToPageMiddleware from '../redirectToPage.middleware';

describe('middleware/redirectToPageMiddleware', () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = ({
      params: {},
      route: {
        path: '',
      },
      redirect: jest.fn(),
    } as unknown) as Context;
  });

  describe('index', () => {
    it('should redirect to dummy on root url', () => {
      // given
      ctx.route.path = '/';

      // when
      // @ts-ignore
      redirectToPageMiddleware(ctx);

      // then
      expect(ctx.redirect).toHaveBeenCalledWith('/dummy');
    });
    it('should not redirect on other url', () => {
      // given
      ctx.route.path = '/other-url';

      // when
      // @ts-ignore
      redirectToPageMiddleware(ctx);

      // then
      expect(ctx.redirect).not.toHaveBeenCalled();
    });
  });
});
