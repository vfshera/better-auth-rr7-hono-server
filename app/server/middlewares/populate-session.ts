/**
 *  Ensure this is the first middleware
 */

import { createMiddleware } from "hono/factory";
import { auth } from "~/.server/auth";
import type { AppBindings } from "../types";

export type SessionVariables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
  isAuthenticated: boolean;
};

export default createMiddleware<AppBindings>(async (ctx, next) => {
  const session = await auth.api.getSession({ headers: ctx.req.raw.headers });

  if (!session) {
    ctx.set("user", null);
    ctx.set("session", null);
    ctx.set("isAuthenticated", false);

    return next();
  }

  ctx.set("user", session.user);
  ctx.set("session", session.session);
  ctx.set("isAuthenticated", true);

  return next();
});
