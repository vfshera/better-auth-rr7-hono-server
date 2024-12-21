import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/_layout";
import { AUTHENTICATED_REDIRECT } from "~/utils/constants";
export async function loader({ context }: Route.LoaderArgs) {
  if (context.isAuthenticated) {
    return redirect(AUTHENTICATED_REDIRECT);
  }

  return {};
}
export default function AuthLayout() {
  return (
    <div className="grid text-center h-screen items-center p-8">
      <Outlet />
    </div>
  );
}
