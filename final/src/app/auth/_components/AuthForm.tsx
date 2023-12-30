"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";


import { publicEnv } from "@/lib/env/public";

import AuthInput from "./AuthInput";
import Image from "next/image";

function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      name,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/main/shop`,
    });
  };
  return (
    <div className="min-w-[400px] border-2 rounded-2xl p-4 border-black bg-white">
      <div className="font-semibold">
        <p>Sign {isSignUp ? "Up" : "In"}</p>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-10">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          {isSignUp && (
            <AuthInput
              label="Name"
              type="text"
              value={name}
              setValue={setName}
            />
          )}
          <AuthInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          {isSignUp && (
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          )}
          <div className="text-sm text-gray-500">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <a
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </a>
              </span>
            ) : (
              <span>
                Do not have an account?{" "}
                <a
                  data-testid="sign-in-up-button"
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </a>
              </span>
            )}
          </div>

          <button
            data-testid="auth-submit-button"
            type="submit"
            className="w-full border-2 rounded-lg py-1 hover:bg-slate-100 mb-3"
          >
            Sign {isSignUp ? "Up" : "In"}
          </button>
        </form>

        <div className="flex w-full items-center gap-1 py-2">
          <div className="h-[1px] grow border-t"></div>
          <p className="text-xs text-gray-400">or</p>
          <div className="h-[1px] grow border-t"></div>
        </div>

        <button
          onClick={async () => {
            signIn("google", {
              callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/main/shop`,
            });
          }}
          className="flex w-full justify-center hover:bg-slate-100 py-2 rounded-md"
        >
          <Image src="/google.png" alt="google icon" width={30} height={20}/>
          <p className="ml-5">Sign In with Google</p>
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
