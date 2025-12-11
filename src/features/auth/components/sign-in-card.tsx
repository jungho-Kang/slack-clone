import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { SignInFlow } from "../types";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <>
      <Card className="w-full h-full p-8">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="mb-1">계속하려면 로그인하세요</CardTitle>
          <CardDescription>
            이메일 또는 다른 계정으로 로그인할 수 있습니다
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4" />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0">
          <form onSubmit={onPasswordSignIn} className="space-y-2.5">
            <Input
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"이메일"}
              type={"email"}
              required
            />
            <Input
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"비밀번호"}
              type={"password"}
              required
            />
            <Button
              type={"submit"}
              className="w-full"
              size={"lg"}
              disabled={pending}
            >
              로그인
            </Button>
          </form>
          <Separator />
          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={pending}
              onClick={() => onProviderSignIn("google")}
              variant={"outline"}
              size={"lg"}
              className="w-full relative"
            >
              <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
              Google로 로그인
            </Button>
            <Button
              disabled={pending}
              onClick={() => onProviderSignIn("github")}
              variant={"outline"}
              size={"lg"}
              className="w-full relative"
            >
              <FaGithub className="size-5 absolute top-2.5 left-2.5" />
              Github로 로그인
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            아직 계정이 없으신가요?{" "}
            <span
              onClick={() => setState("signUp")}
              className="text-sky-700 hover:underline cursor-pointer font-semibold"
            >
              지금 가입하기
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};
