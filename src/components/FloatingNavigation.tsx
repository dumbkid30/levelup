"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconSchool,
  IconHeart,
  IconPhone,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function FloatingNavigation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },
    {
      title: "Career Launchpad",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#career",
    },
    {
      title: "Professional Courses",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#courses",
    },
    {
      title: "Study Abroad",
      icon: (
        <IconSchool className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/study-abroad",
    },
    {
      title: "Healthcare Jobs",
      icon: (
        <IconHeart className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#healthcare",
    },
    {
      title: "Contact",
      icon: (
        <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact",
    },
    {
      title: "Login",
      icon: (
        <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#login",
    },
    {
      title: "Sign Up",
      icon: (
        <IconUserPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/signup",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock
        items={links}
        desktopClassName="bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl shadow-orange-500/10"
        mobileClassName="bg-black/60 backdrop-blur-xl border border-white/20"
      />
    </div>
  );
}
