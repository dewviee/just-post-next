"use client";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useLogin } from "@/hooks/useAuth";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Login() {
  const {
    identifier,
    login,
    isFetching,
    password,
    handleSetIdentifier,
    handleSetPassword,
  } = useLogin();

  const handleLogin = () => {
    login((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="mx-10 flex flex-col items-center justify-center gap-2 p-10">
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-2">
        <TextField
          inputName="identifier"
          inputValue={identifier}
          onInputChange={handleSetIdentifier}
          label="Username"
        />
        <TextField
          inputName="password"
          inputValue={password}
          onInputChange={handleSetPassword}
          label="Password"
          type="password"
        />
        <div>
          {"Don't have account? Register "}
          <Link href={"register"} className="appearance-none text-primary">
            here
          </Link>
        </div>
        <Button type="submit" disabled={isFetching}>
          Login
        </Button>
      </form>
    </div>
  );
}
