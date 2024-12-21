import type { SessionVariables } from "./middlewares/populate-session";

export type AppBindings = {
  Variables: SessionVariables;
};
