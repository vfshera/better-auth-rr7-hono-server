/**
 *
 * This is a protected route.
 *
 * The hono protect middleware will ensure that the user is authenticated before they can access this route.
 */

export default function Protected() {
  return (
    <div>
      <h1>Protected</h1>
    </div>
  );
}
