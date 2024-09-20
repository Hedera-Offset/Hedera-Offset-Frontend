import { UserRegisterForm } from "@/components/auth/register-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Industry1 from "../../public/images/pikaso_texttoimage_35mm-film-photography-A-futuristic-green-industry- (1).jpeg";

// import * as React from "react";

export default function RegisterPage() {
  return (
    <div className="">
      <div className="md:hidden ">
        <img
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />

        <img
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>

      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>

        <div className="relative hidden h-full flex-col bg-muted  text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <h1 className="z-10 font-bold text-8xl absolute top-[24rem] left-[10rem] text-white opacity-100">
            Hedera Offset
          </h1>
          <div className="relative z-20 ">
            <div className="relative">
              <img
                src={Industry1}
                className="opacity-50"
                alt="Authentication"
              />
            </div>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
              <p className="text-sm text-muted-foreground">
                Create your own company on blockvolt.
              </p>
            </div>

            <UserRegisterForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
