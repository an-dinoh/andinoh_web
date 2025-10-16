"use client";

import Link from "next/link";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function ResgisterPage() {
  return (
    <div className="bg-white/90 rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Create an Account
      </h1>

      <form className="space-y-4">
        <InputField label="Full Name" placeholder="Enter your full name" />
        <InputField label="Email" type="email" placeholder="Enter your email" />
        <InputField
          label="Password"
          type="password"
          placeholder="Create a password"
        />
        <Button text="Sign Up" />
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-sm font-semibold"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
