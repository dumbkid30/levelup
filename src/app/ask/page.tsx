"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaceholdersAndVanishInputDemo from "@/components/placeholders-and-vanish-input-demo";

export default function AskPage() {
    return (
        <div className="min-h-screen bg-black text-white font-pixel flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center px-4 pt-28">
                <PlaceholdersAndVanishInputDemo />
            </main>
            <Footer />
        </div>
    );
}
