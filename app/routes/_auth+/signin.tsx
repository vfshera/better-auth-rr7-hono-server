import { Form, Link, useNavigate } from "react-router";
import { authClient } from "~/lib/auth.client";
import { GithubIcon } from "~/components/icons";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "~/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { Route } from "./+types/signin";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sign In" }];
}
export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const signIn = async (credentials: LoginSchemaType) => {
    await authClient.signIn.email(credentials, {
      onSuccess: (ctx) => {
        navigate("/dashboard");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      fetchOptions: {
        onSuccess: (ctx) => {
          navigate("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <div>
      <h1 className="mb-2 text-3xl  text-gray-900 font-semibold">Sign In</h1>
      <p className="mb-16 text-gray-600 font-normal text-lg">
        Enter your email and password to sign in
      </p>
      <Form
        onSubmit={handleSubmit(signIn)}
        className="mx-auto max-w-[24rem] text-left"
      >
        <div className="mb-6">
          <label htmlFor="email">
            <span className="mb-2 block font-medium text-gray-900">
              Your Email
            </span>
          </label>
          <Input
            type="email"
            placeholder="name@mail.com"
            className="text-base py-3"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password">
            <span className="mb-2 block font-medium text-gray-900">
              Password
            </span>
          </label>
          <Input
            placeholder="********"
            className="text-base py-3"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button
          disabled={isSubmitting}
          className="mt-6 w-full bg-black py-5 uppercase"
        >
          sign in
        </Button>
        <div className="mt-4 flex justify-end">
          <Link to="/" className="font-medium">
            Forgot password
          </Link>
        </div>
        <Button
          disabled={isSubmitting}
          type="button"
          className="mt-6 flex items-center justify-center gap-2 w-full bg-black py-5 uppercase"
          onClick={handleGithubSignIn}
        >
          <GithubIcon className="size-8" />
          sign in with github
        </Button>
        <p className="mt-4 text-center font-normal text-gray-600">
          Not registered?{" "}
          <Link to="/signup" className="font-medium text-gray-900">
            Create account
          </Link>
        </p>
      </Form>
    </div>
  );
}
