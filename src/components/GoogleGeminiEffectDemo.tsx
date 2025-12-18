"use client";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export default function GoogleGeminiEffectDemo() {
    return (
        <div className="w-full bg-black pb-0 pt-0">
            <GoogleGeminiEffect
                title="A simple yet comprehensive plan to follow"
                description="Modern engineering interviews span frontend, backend, AI, and forward-deployed roles. Beyond role-specific concepts, many companies still assess core problem-solving and system fundamentals. We’ve condensed everything into a clear, structured strategy you can follow to master essential interview patterns—across roles."
            />
        </div>
    );
}
