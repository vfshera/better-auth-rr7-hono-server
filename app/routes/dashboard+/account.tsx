import type { Route } from "./+types/account";
import { requireAuth } from "~/.server/auth/utils";

export function meta() {
  return [{ title: "Account" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth(request);

  return { user };
}

export default function Account({ loaderData: { user } }: Route.ComponentProps) {
  return (
    <div className="space-y-5 p-5">
      <h1 className="text-2xl font-semibold">Account</h1>

      <section>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </section>
    </div>
  );
}
