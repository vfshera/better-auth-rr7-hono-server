/**
 * Auth guards middleware
 * @see - https://github.com/Shelf-nu/shelf.nu/blob/main/server/middleware.ts
 */

import { createMiddleware } from "hono/factory";
import { pathToRegexp } from "path-to-regexp";
import type { AppBindings } from "../types";
import {
  REDIRECT_PATH_PARAM,
  UNAUTHENTICATED_REDIRECT,
} from "~/utils/constants";

function pathMatch(paths: string[], requestPath: string) {
  for (const path of paths) {
    const { regexp } = pathToRegexp(path);

    if (regexp.test(requestPath)) {
      return true;
    }
  }

  return false;
}

/**
 * Protected routes middleware
 *
 * @param options.publicPath - The public paths
 * @param options.onFailRedirectTo - The path to redirect to if the user is not logged in
 *
 */
export function protect({
  publicPaths,
  onFailRedirectTo = UNAUTHENTICATED_REDIRECT,
}: {
  publicPaths: string[];
  onFailRedirectTo?: string;
}) {
  return createMiddleware<AppBindings>(async (ctx, next) => {
    const isPublic = pathMatch(publicPaths, ctx.req.path);

    if (isPublic) {
      return next();
    }

    const isAuthenticated = ctx.get("isAuthenticated");

    if (!isAuthenticated) {
      return ctx.redirect(
        `${onFailRedirectTo}?${REDIRECT_PATH_PARAM}=${ctx.req.path}`
      );
    }

    return next();
  });
}
