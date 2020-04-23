import { Context, Middleware } from '@nuxt/types';

const redirectToPageMiddleware: Middleware = (ctx: Context): void => {
  if (ctx.route.path === '/') return ctx.redirect('/dummy');
};

export default redirectToPageMiddleware;
