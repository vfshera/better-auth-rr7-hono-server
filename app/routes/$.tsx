import { Button } from "~/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { Link } from "react-router";

export function meta() {
  return [{ title: "Page Not Found" }];
}

export default function LayoutSplat() {
  return (
    <div className="flex size-full h-screen items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <TriangleAlert className="size-16 text-red-600" />

        <h1 className="mb-2 text-3xl font-semibold">Page not found</h1>

        <p className="max-w-[550px]">
          We couldn't find the page you were looking for.
        </p>

        <div className=" mt-8 flex gap-3">
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
