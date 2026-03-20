"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Briefcase } from "lucide-react"
import { WalletButton } from "./wallet-button"

const navItems = [
  { label: "For Investors", href: "/investors" },
  { label: "For Students", href: "/students" },
  { label: "Discover", href: "/discover" },
  { label: "Dashboard", href: "/dashboard" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-foreground bg-background">
      <div className="flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 px-6 border-r border-foreground h-full hover:bg-muted/50 transition-colors">
          <div className="flex h-7 w-7 items-center justify-center bg-foreground text-background">
            <span className="text-xs font-bold">eI</span>
          </div>
          <span className="text-sm font-semibold tracking-tight hidden sm:inline">eduInvest</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center h-full flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-6 h-full text-sm font-medium border-r border-foreground hover:bg-muted/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center h-full ml-auto">
          {/* Phantom Wallet */}
          <WalletButton />

          <Link
            href="/portfolio"
            className="hidden sm:flex items-center gap-2 px-6 h-full text-sm font-medium border-l border-foreground hover:bg-muted/50 transition-colors"
          >
            <Briefcase className="h-4 w-4" />
            Portfolio
          </Link>
          <Link
            href="/discover"
            className="hidden sm:flex items-center px-6 h-full text-sm font-semibold uppercase tracking-[0.05em] bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Get Started
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-14 h-full border-l border-foreground"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-foreground">
          <nav className="divide-y divide-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-6 py-4 text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-6 py-4 text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <Briefcase className="h-4 w-4" />
              Portfolio
            </Link>
            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center px-6 py-4 text-sm font-semibold uppercase tracking-[0.05em] bg-accent text-accent-foreground"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
