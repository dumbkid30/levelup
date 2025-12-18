"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    title: "Monthly",
    oldPrice: "₹3,300",
    price: "₹1,700",
    cadence: "/month",
    billed: "Billed monthly",
    discount: "50% off",
    highlight: false,
    ctaHref: "/jobs",
    features: [
      "Unlock all premium interview content",
      "Access to updates while subscription is active"
    ]
  },
  {
    title: "Quarterly",
    oldPrice: "₹2,400",
    price: "₹1,300",
    cadence: "/month",
    billed: "Billed quarterly (₹3,700)",
    discount: "50% off",
    highlight: false,
    ctaHref: "/prepare",
    features: [
      "Unlock all premium interview content",
      "Access to updates while subscription is active",
      "Join a private Discord channel for live support"
    ]
  },
  {
    title: "Annual",
    oldPrice: "₹920",
    price: "₹430",
    cadence: "/month",
    billed: "Billed yearly (₹5,100)",
    discount: "50% off",
    highlight: true,
    badge: "Recommended",
    ctaHref: "/courses",
    features: [
      "Unlock all premium interview content",
      "Access to updates while subscription is active",
      "Join a private Discord channel for live support"
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white font-pixel flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-20 w-80 h-80 bg-amber-400/10 blur-[120px]" />
          <div className="absolute right-[-120px] bottom-[-60px] w-[520px] h-[520px] bg-amber-500/12 blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-amber-400/30 text-xs md:text-sm text-amber-100 font-mono uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(251,191,36,0.08)]">
              Pricing · Built for Engineers Navigating a Tough Job Market
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Get ahead in a market that rewards the prepared.
            </h1>
            <p className="mt-4 text-zinc-300 text-base md:text-lg max-w-3xl mx-auto font-sans leading-relaxed">
              Choose a plan that pairs curated learning with interview prep so you stand out and land the roles you want.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`relative border rounded-2xl bg-black/60 p-6 md:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.45)] ${
                  plan.highlight ? "border-amber-400/40" : "border-white/10"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-4 bg-amber-400 text-black text-[11px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <div className="flex flex-col gap-2 mb-4">
                  <div className="text-sm text-zinc-400 font-bold uppercase tracking-[0.2em]">
                    {plan.title} plan
                  </div>
                  <div className="text-sm text-zinc-500 line-through">{plan.oldPrice}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                    <span className="text-zinc-400 text-sm">{plan.cadence}</span>
                  </div>
                  <div className="text-amber-200 text-sm font-mono uppercase tracking-[0.2em]">
                    {plan.discount}
                  </div>
                  <div className="text-zinc-400 text-sm">{plan.billed}</div>
                </div>

                <Link
                  href={plan.ctaHref}
                  className="inline-flex w-full items-center justify-center px-6 py-3 rounded-full border border-amber-400/40 text-amber-100 font-bold uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-black transition-colors"
                >
                  Buy now
                </Link>

                <div className="my-6 h-px bg-white/10" />

                <ul className="space-y-3 text-sm text-zinc-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-amber-300 mt-[2px]" />
                      <span className="font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Included in every plan</h2>
            <p className="text-zinc-300 font-sans">
              Live support via private channels, weekly prep sprints, and fresh role intel curated for engineers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
