"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fontSpace } from "@/app/constants";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Tracking", href: "/tracking" },
  { name: "About", href: "/about" },
];

// Pre-computed star particles to avoid Math.random() during render
const starParticles = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 8.33 + (i % 3) * 5),
  top: (i * 7.5 + (i % 4) * 10),
  delay: i * 0.25,
  duration: 2 + (i % 3),
  opacity: 0.3 + (i % 5) * 0.1,
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-cyan-500/20 shadow-[0_8px_32px_0_rgba(0,221,255,0.15)]"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Animated star particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Aurora glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Orbital ring around logo */}
              <div className="absolute inset-0 w-12 h-12 border-2 border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-1 w-10 h-10 border-2 border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              
              {/* Logo center */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="w-8 h-8 bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-[0_0_20px_rgba(0,221,255,0.6)] group-hover:shadow-[0_0_30px_rgba(0,221,255,0.8)] transition-all duration-300" />
                <div className="absolute w-4 h-4 bg-white/90 rounded-full animate-pulse" />
              </div>
            </div>
            
            <div>
              <h1
                className="text-2xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-400 transition-all duration-300"
                style={fontSpace}
              >
                NovaWatch
              </h1>
              <p className="text-[10px] text-cyan-400/60 tracking-widest" style={fontSpace}>
                COSMIC OBSERVATORY
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 group ${
                  pathname === link.href
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
                style={fontSpace}
              >
                {/* Hover background effect */}
                <span className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                
                {/* Active indicator */}
                {pathname === link.href && (
                  <>
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(0,221,255,0.8)]" />
                    <span className="absolute inset-0 bg-cyan-500/5 rounded-lg" />
                  </>
                )}
                
                <span className="relative">{link.name}</span>
                
                {/* Particle effect on hover */}
                <span className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="relative hidden md:flex items-center px-6 py-2.5 text-sm font-semibold overflow-hidden group"
            style={fontSpace}
          >
            {/* Animated border */}
            <span className="absolute inset-0 border-2 border-cyan-400/50 rounded-full" />
            <span className="absolute inset-0 border-2 border-cyan-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
            
            {/* Animated background */}
            <span className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            
            {/* Glow effect */}
            <span className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            
            {/* Button text */}
            <span className="relative text-cyan-400 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span>Launch</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            
            {/* Rocket trail effect */}
            <span className="absolute right-0 top-1/2 w-20 h-0.5 bg-linear-to-l from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-24 transition-all duration-500" />
          </button>

          {/* Mobile menu button */}
          <button className="md:hidden relative w-10 h-10 flex items-center justify-center group">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-1.5">
              <span className="block w-6 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:bg-white" />
              <span className="block w-6 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:bg-white" />
              <span className="block w-6 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:bg-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom scanline effect */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`} 
      />
    </nav>
  );
}
