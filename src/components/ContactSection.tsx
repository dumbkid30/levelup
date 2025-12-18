"use client";
import React from "react";
import Link from "next/link";
import {
    Mail,
    MessageSquare,
    Linkedin,
    Twitter,
    Github,
    Disc
} from "lucide-react";
import { IconBrandDiscord, IconBrandGithub, IconBrandLinkedin, IconBrandReddit, IconBrandX } from "@tabler/icons-react";

export const ContactSection = () => {
    return (
        <div className="w-full bg-black text-white pt-10 pb-20 md:pt-16 md:pb-24 border-t border-white/10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Info & Links */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 font-pixel uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                                Don't hesitate to reach out.
                                <br />
                                We're always here to help.
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-md font-pixel">
                                Have questions, feedback, or anything to say? Tell us. We usually get back within 1-2 days.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <ContactLink icon={<Mail size={20} />} label="Email us" href="mailto:hello@example.com" />
                            <ContactLink icon={<IconBrandDiscord size={20} />} label="Join Discord (public)" href="#" highlighted />
                            <ContactLink icon={<IconBrandLinkedin size={20} />} label="Follow our LinkedIn page" href="#" />
                            <ContactLink icon={<IconBrandX size={20} />} label="Follow us on X" href="#" />
                            <ContactLink icon={<IconBrandGithub size={20} />} label="Follow us on GitHub" href="#" />
                            <ContactLink icon={<IconBrandReddit size={20} />} label="Join Reddit community" href="#" />
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-zinc-900/50 p-6 md:p-8 border-2 border-white/5">
                        <form className="flex flex-col gap-6">
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2 uppercase tracking-wider">
                                    * Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    placeholder="WRITE YOUR MESSAGE..."
                                    className="w-full bg-zinc-950 border-2 border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 resize-none font-pixel"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2 uppercase tracking-wider">
                                    Contact email (optional)
                                </label>
                                <p className="text-xs text-zinc-500 mb-2">If you'd like a reply, please provide your email address</p>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="JOHN@EXAMPLE.COM"
                                    className="w-full bg-zinc-950 border-2 border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 font-pixel"
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black font-bold px-8 py-3 border-b-4 border-r-4 border-yellow-600 active:border-0 active:translate-y-1 transition-all uppercase"
                                >
                                    Send message
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

const ContactLink = ({ icon, label, href, highlighted }: { icon: React.ReactNode, label: string, href: string, highlighted?: boolean }) => {
    return (
        <Link
            href={href}
            className={`group flex items-center justify-between p-4 border border-transparent hover:border-white/5 transition-all ${highlighted ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        >
            <div className="flex items-center gap-4">
                <span className={highlighted ? "text-yellow-400" : "text-zinc-500 group-hover:text-white transition-colors"}>
                    {icon}
                </span>
                <span className="font-medium text-base">{label}</span>
            </div>
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                →
            </span>
        </Link>
    )
}
