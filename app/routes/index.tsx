import { Link } from "react-router";
import type { Route } from "./+types/index";
import { auth } from "~/.server/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router + Better Auth" },
    { name: "description", content: "React Router 7 + Better Auth" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  return { userName: session?.user?.name };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="grid text-center h-screen items-center p-8">
      <div className="space-y-10">
        <h1 className="text-4xl">React Router 7 + Better Auth</h1>
        <div className="flex justify-center gap-4 max-w-[600px] mx-auto">
          {loaderData.userName ? (
            <div className="flex flex-col gap-5">
              <p className="px-4 py-2.5 rounded bg-secondary text-secondary-foreground">
                Welcome, {loaderData.userName}
              </p>
              <Link
                to="/dashboard"
                className="px-4 py-2.5 rounded bg-primary text-primary-foreground "
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <>
              {" "}
              <Link
                to="/signin"
                className="px-4 py-2.5 rounded bg-primary text-primary-foreground "
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2.5 rounded bg-secondary text-secondary-foreground border border-black "
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
