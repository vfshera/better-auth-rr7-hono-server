import { createHonoServer } from "react-router-hono-server/node";
import populateSession, {
  type SessionVariables,
} from "./middlewares/populate-session";
import type { AppBindings } from "./types";

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
  interface AppLoadContext {
    user: SessionVariables["user"];
    session: SessionVariables["session"];
    isAuthenticated: SessionVariables["isAuthenticated"];
  }
}

export default await createHonoServer<AppBindings>({
  configure(server) {
    /**
     * Add session and user to the context
     *  NOTE: Always put it first
     */
    server.use(populateSession);
  },
  getLoadContext(ctx) {
    return {
      user: ctx.get("user"),
      session: ctx.get("session"),
      isAuthenticated: ctx.get("isAuthenticated"),
    };
  },
});
