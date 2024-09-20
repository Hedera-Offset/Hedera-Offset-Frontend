import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { register as userRegister } from "@/apis";
import { useToast } from "../ui/use-toast";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const pubKeyRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [userType, setUserType] = React.useState<string>("user"); // Default to "user"
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const resp = await userRegister(
        nameRef.current?.value || "",
        emailRef.current?.value || "",
        pubKeyRef.current?.value || "",
        passwordRef.current?.value || "",
        userType
      );

      if (resp === 201) {
        toast.toast({ title: "User Created" });
        navigate("/login");
      } else if (resp === 400) {
        toast.toast({ title: "Info", description: "User already exists" });
      } else {
        toast.toast({ title: "Info", description: "Something went wrong" });
      }
    } catch (error) {
      console.error(error);
      toast.toast({ title: "Error", description: "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              ref={nameRef}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="john@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              ref={emailRef}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="publickey">
              Wallet Public Key
            </Label>
            <Input
              id="publickey"
              placeholder="0x...."
              type="text"
              autoCapitalize="none"
              autoComplete="publickey"
              autoCorrect="off"
              disabled={isLoading}
              ref={pubKeyRef}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              ref={passwordRef}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {userType === "user" ? "Select User Type" : userType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>User Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setUserType("BUYER")}
                className={userType === "BUYER" ? "bg-gray-200" : ""}
              >
                BUYER
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setUserType("GENERATOR")}
                className={userType === "GENERATOR" ? "bg-gray-200" : ""}
              >
                GENERATOR
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
