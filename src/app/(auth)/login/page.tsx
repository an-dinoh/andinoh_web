"use client";

import Link from "next/link";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="px-10 align-left">
      <h1 className="text-2xl font-semibold mb-6">
        Hotel Manager Login
      </h1>

      <form className="space-y-4">
        <InputField label="Email" type="email" placeholder="Enter your email" />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Button text="Sign In" />
      </form>

      <p className="text-right text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover: font-sm font-medium"
        >Sign up</Link>
      </p>
    </div>
  );
}
