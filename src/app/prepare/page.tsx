import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { AnimatedTooltipPreview } from "@/components/AnimatedTooltipPreview";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CodePlayground } from "@/components/CodePlayground";
import GoogleGeminiEffectDemo from "@/components/GoogleGeminiEffectDemo";
import { DreamJobCTA } from "@/components/DreamJobCTA";
import { ContactSection } from "@/components/ContactSection";

const flipWords = ["Frontend", "Backend", "AI", "Forward-Deployed", "Beyond"];

export default function PreparePage() {
  return (
    <div className="min-h-screen bg-black text-white font-pixel">
      <Navbar />

      <main className="flex flex-col overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -left-16 top-10 h-48 w-48 bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-4 bottom-10 h-64 w-64 bg-purple-500/10 blur-[90px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.05),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(192,132,252,0.06),transparent_30%)]" />
        </div>

        <ContainerScroll
          titleComponent={
            <div className="relative z-10 flex flex-col items-center justify-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
                Prepare
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] flex flex-wrap items-center justify-center gap-2 text-center max-w-4xl mx-auto mt-4">
                Prepare for Modern Engineering Roles
                <FlipWords
                  words={flipWords}
                  className="text-4xl md:text-5xl text-cyan-200 !p-0"
                />
              </h1>

              <div className="mt-3">
                <TextGenerateEffect
                  words="Meet the interview prep platform designed to simplify interviews for modern engineering roles."
                  className="text-base md:text-lg text-white/70 font-mono font-normal text-center max-w-2xl mx-auto"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-6 mt-4">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-black font-bold text-lg border-b-4 border-r-4 border-yellow-600 active:border-0 active:translate-y-1 transition-all uppercase"
                >
                  Get Started Now
                </Link>

                <div className="flex flex-col items-center gap-2">
                  <AnimatedTooltipPreview />
                  <p className="text-xs text-zinc-500 font-medium">Join 1,000+ engineers prepping for top roles</p>
                </div>
              </div>
            </div>
          }
        >
          <div className="w-full h-full rounded-2xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-2xl">
            <CodePlayground />
          </div>
        </ContainerScroll>
      </main>



      <GoogleGeminiEffectDemo />
      <DreamJobCTA />
      <ContactSection />

      <Footer />
    </div >
  );
}
