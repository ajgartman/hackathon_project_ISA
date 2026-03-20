import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-foreground">
      {/* Decorative blob */}
      <div className="absolute -right-20 top-20 w-[400px] h-[400px] bg-accent blob-shape opacity-80 pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] bg-neon blob-shape opacity-60 pointer-events-none" />
      
      <div className="relative grid lg:grid-cols-2">
        {/* Left column - Content */}
        <div className="border-r border-foreground p-8 lg:p-16">
          <h1 className="font-serif huge-title mb-8">
            <span className="text-balance">Invest in</span>
            <br />
            <span className="text-balance">tomorrow&apos;s</span>
            <br />
            <span className="text-accent">brightest</span>
          </h1>
          
          <p className="max-w-md text-base leading-relaxed mb-10">
            eduInvest is a decentralised platform built on Solana that enables investors
            and philanthropists to directly fund university students through blockchain-enforced
            Income Share Agreements. Every transaction is real and verifiable on-chain.
          </p>

          <div className="flex flex-wrap gap-0">
            <Link 
              href="/discover"
              className="flex items-center gap-2 px-6 py-4 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors border border-foreground"
            >
              Start Discovering
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/students"
              className="flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors border border-foreground border-l-0"
            >
              I&apos;m a Student
            </Link>
          </div>
        </div>

        {/* Right column - Stats */}
        <div className="grid grid-cols-2">
          {[
            { label: "Students Funded", value: "2,400+", border: "border-b border-r" },
            { label: "Total Invested", value: "$18M", border: "border-b" },
            { label: "On-Chain Txns", value: "47K+", border: "border-r" },
            { label: "Blockchain", value: "Solana", border: "" },
          ].map((stat, idx) => (
            <div key={stat.label} className={`p-8 lg:p-12 border-foreground ${stat.border}`}>
              <p className="font-serif text-4xl lg:text-5xl mb-2">
                {stat.value}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">
                {stat.label} <span className="text-accent">→</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
