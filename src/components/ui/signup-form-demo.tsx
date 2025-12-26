"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconUserPlus,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const [status, setStatus] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitted! (stub) — wire this to your signup handler.");
  };
  return (
    <div className="dark mx-auto w-full max-w-xl rounded-2xl border border-amber-400/25 bg-gradient-to-b from-zinc-950 via-black to-black p-4 md:p-8 shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
      <h2 className="text-2xl font-bold text-white">
        Welcome to LevelUp
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-200 font-sans">
        Login to LevelUp if you can because we don't have a login flow yet
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-white">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-white">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="universityId" className="text-white">Your university rollno (optional)</Label>
          <Input
            id="universityId"
            placeholder="Enter your university ID"
            type="text"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-11 w-full rounded-md bg-amber-400 text-black font-bold uppercase tracking-[0.16em] shadow-[0_12px_30px_rgba(251,191,36,0.35)] border-b-2 border-r-2 border-amber-600 active:translate-y-[1px] transition-all"
          type="submit"
        >
          Sign up
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white/5 px-4 font-medium text-white border border-white/10 hover:border-amber-300/50 transition-colors"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-amber-300" />
            <span className="text-sm text-white">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white/5 px-4 font-medium text-white border border-white/10 hover:border-amber-300/50 transition-colors"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-amber-300" />
            <span className="text-sm text-white">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-white/5 px-4 font-medium text-white border border-white/10 hover:border-amber-300/50 transition-colors"
            type="submit"
          >
            <IconUserPlus className="h-4 w-4 text-amber-300" />
            <span className="text-sm text-white">
              Join as Mentor
            </span>
            <BottomGradient />
          </button>
        </div>

        {status && (
          <p className="mt-4 text-sm font-medium text-green-400" role="status">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
