import Link from "next/link"

const footerLinks = {
  invest: [
    { label: "Start Investing", href: "/discover" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Returns Calculator", href: "/calculator" },
  ],
  students: [
    { label: "Apply for Funding", href: "/students" },
    { label: "Eligibility", href: "/eligibility" },
    { label: "Success Stories", href: "/stories" },
    { label: "Student FAQ", href: "/faq/students" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Investment Disclosures", href: "/disclosures" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="grid md:grid-cols-5">
        {/* Brand */}
        <div className="p-8 md:col-span-1 border-b md:border-b-0 md:border-r border-background/20">
          <Link href="/" className="inline-block font-semibold text-lg mb-4">
            S. Scholar
          </Link>
          <p className="text-sm leading-relaxed text-background/70">
            Connecting investors with the brightest minds. Building the future 
            of education funding.
          </p>
        </div>

        {/* Links */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-background/20">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-accent">
            Invest →
          </h3>
          <ul className="space-y-2">
            {footerLinks.invest.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-background/70 hover:text-background heavy-underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 border-b md:border-b-0 md:border-r border-background/20">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4" style={{ color: 'var(--neon)' }}>
            Students →
          </h3>
          <ul className="space-y-2">
            {footerLinks.students.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-background/70 hover:text-background heavy-underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 border-b md:border-b-0 md:border-r border-background/20">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-background/50">
            Company →
          </h3>
          <ul className="space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-background/70 hover:text-background heavy-underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-background/50">
            Legal →
          </h3>
          <ul className="space-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-background/70 hover:text-background heavy-underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/20 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-background/50">
          © {new Date().getFullYear()} Scholar Invest. All rights reserved.
        </p>
        <p className="text-xs text-background/40">
          Investment involves risk. Past performance is not indicative of future results.
        </p>
      </div>
    </footer>
  )
}
