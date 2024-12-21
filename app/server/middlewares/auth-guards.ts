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
 * @param options.protectedPaths - The protected paths
 * @param options.onFailRedirectTo - The path to redirect to if the user is not logged in
 *
 */
export function protect({
  protectedPaths,
  onFailRedirectTo = UNAUTHENTICATED_REDIRECT,
}: {
  protectedPaths: string[];
  onFailRedirectTo?: string;
}) {
  return createMiddleware<AppBindings>(async (ctx, next) => {
    const isProtected = pathMatch(protectedPaths, ctx.req.path);

    if (!isProtected) {
      return next();
    }

    const isAuthenticated = ctx.get("isAuthenticated");

    if (!isAuthenticated) {
      const url = new URL(ctx.req.url);
      return ctx.redirect(
        `${onFailRedirectTo}?${REDIRECT_PATH_PARAM}=${encodeURI(
          url.pathname + url.search
        )}`
      );
    }

    return next();
  });
}
