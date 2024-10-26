"use client";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useRegister } from "@/hooks/useAuth";
import Link from "next/link";

export default function RegisterPage() {
  const { formData, getFormDataName, handleFormDataChange, handleSubmit } =
    useRegister();

  return (
    <div className="mt-10 flex flex-col items-center">
      <form
        className="flex flex-col justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email"
          inputValue={formData.email}
          inputName={getFormDataName("email")}
          onInputChange={handleFormDataChange}
        />
        <TextField
          label="Username"
          inputValue={formData.username}
          inputName={getFormDataName("username")}
          onInputChange={handleFormDataChange}
        />
        <TextField
          label="Password"
          inputType="password"
          inputValue={formData.password}
          inputName={getFormDataName("password")}
          onInputChange={handleFormDataChange}
        />
        <TextField
          label="Confirm Password"
          inputType="password"
          inputValue={formData.confirmPassword}
          inputName={getFormDataName("confirmPassword")}
          onInputChange={handleFormDataChange}
        />
        <div>
          {"Already have account? Login "}
          <Link href={"login"} className="appearance-none text-primary">
            here
          </Link>
        </div>

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
