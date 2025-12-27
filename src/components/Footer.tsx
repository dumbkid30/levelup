"use client";
import React from "react";
import Link from "next/link";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandWhatsapp
} from "@tabler/icons-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">

          {/* Left Column: Brand & Newsletter */}
          <div className="lg:w-1/3 flex flex-col gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/assets/logo/logo.png"
                  alt="LevelUp Logo"
                  width={240}
                  height={60}
                  className="object-contain"
                />
              </div>
              <p className="text-zinc-400 text-lg max-w-sm">
                Your dream job is absolutely worth it.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">Join our OG WhatsApp Group</h3>
              <p className="text-zinc-400 text-sm">
                Get exclusive job alerts, coding challenges, and mentorship.
              </p>
              <a href="https://chat.whatsapp.com/KQ4sWcUF5OTEy7ngJA6j7h" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#25D366] text-black px-5 py-3 font-bold rounded hover:bg-[#20bd5a] transition-colors w-fit">
                <IconBrandWhatsapp size={24} />
                <span>Join Community</span>
              </a>
            </div>

            <div className="flex gap-4">
              <SocialIcon icon={<IconBrandLinkedin size={24} />} href="#" />
              <SocialIcon icon={<IconBrandDiscord size={24} />} href="#" />
              <SocialIcon icon={<IconBrandX size={24} />} href="#" />
              <SocialIcon icon={<IconBrandGithub size={24} />} href="#" />
            </div>
          </div>

          {/* Right Columns: Links Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white uppercase tracking-wider">Practice</h3>
              <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
                <FooterLink href="#">Get started</FooterLink>
                <FooterLink href="#">JavaScript functions</FooterLink>
                <FooterLink href="#">User interface coding</FooterLink>
                <FooterLink href="#">System design</FooterLink>
                <FooterLink href="#">Quiz</FooterLink>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white uppercase tracking-wider">Guides</h3>
              <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
                <FooterLink href="#">API Integration Playbook</FooterLink>
                <FooterLink href="#">System Design Playbook</FooterLink>
                <FooterLink href="#">Design Patterns Playbook</FooterLink>
                <FooterLink href="#">Behavioral Interview Playbook</FooterLink>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white uppercase tracking-wider">Mentor Plans</h3>
              <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
                <FooterLink href="#">1 Week Plan</FooterLink>
                <FooterLink href="#">1 Month Plan</FooterLink>
                <FooterLink href="#">3 Months Plan</FooterLink>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white uppercase tracking-wider">Company</h3>
              <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
                <FooterLink href="#">Pricing</FooterLink>
                <FooterLink href="#">Promotions</FooterLink>
                <FooterLink href="#">Roadmap</FooterLink>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Team</FooterLink>
                <FooterLink href="#">Contact us</FooterLink>
                <FooterLink href="#">Advertise with us <span className="text-yellow-400 text-[10px] ml-1 px-1 border border-yellow-400/30 rounded bg-yellow-400/10">NEW</span></FooterLink>
                <FooterLink href="#">Become an affiliate</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Medium</FooterLink>
                <FooterLink href="#">DEV Community</FooterLink>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© 2025 LevelUp Edutech Solutions Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>


    </footer>
  );
}

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <Link href={href} className="hover:text-white transition-colors block leading-relaxed">
      {children}
    </Link>
  </li>
)

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a href={href} className="text-zinc-400 hover:text-white transition-colors">
    {icon}
  </a>
)
