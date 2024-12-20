import type { Route } from "./+types/index";
export function meta({ location }: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function Dashboard(props: Route.ComponentProps) {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
    </div>
  );
}
