import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, TrendingUp, Heart, Shield, Users, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Returns",
    description: "Average annual returns of 8-15% through income share agreements with successful graduates.",
  },
  {
    icon: Heart,
    title: "Social Impact",
    description: "Support talented students who might not otherwise afford higher education, creating lasting change.",
  },
  {
    icon: Shield,
    title: "Vetted Opportunities",
    description: "Every student is rigorously screened for academic excellence and career potential.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Join a network of investors committed to education and building relationships with future leaders.",
  },
]

const investmentTypes = [
  {
    title: "Invest",
    subtitle: "For Financial Returns",
    icon: TrendingUp,
    isInvest: true,
    features: [
      "Income Share Agreements (ISAs)",
      "Average 12% annual returns",
      "Quarterly performance reports",
      "Portfolio diversification across fields",
      "Secondary market access",
    ],
    cta: "Start Investing",
  },
  {
    title: "Donate",
    subtitle: "For Philanthropic Impact",
    icon: Heart,
    isInvest: false,
    features: [
      "100% tax deductible",
      "Direct student support",
      "Progress updates from students",
      "Named scholarship options",
      "Impact reports and metrics",
    ],
    cta: "Make a Donation",
  },
]

export default function InvestorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground">
          <div className="absolute -right-20 top-20 w-[400px] h-[400px] bg-accent blob-shape opacity-70 pointer-events-none" />
          
          <div className="relative grid lg:grid-cols-2">
            <div className="p-8 lg:p-16 border-r border-foreground">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-accent">
                For Investors →
              </div>
              <h1 className="font-serif huge-title mb-8">
                <span className="text-balance">Shape the</span>
                <br />
                <span className="text-balance">future through</span>
                <br />
                <span className="text-accent">education</span>
              </h1>
              
              <p className="max-w-md text-base leading-relaxed mb-10">
                Discover exceptional students, support their academic journey, and 
                potentially earn returns while making a lasting social impact.
              </p>

              <div className="flex flex-wrap gap-0">
                <Link 
                  href="/discover"
                  className="flex items-center gap-2 px-6 py-4 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors border border-foreground"
                >
                  Browse Students
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="#how-it-works"
                  className="flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors border border-foreground border-l-0"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2">
              {[
                { label: "Avg. Annual Return", value: "12.4%", border: "border-b border-r" },
                { label: "Students Funded", value: "2,400+", border: "border-b" },
                { label: "Success Rate", value: "94%", border: "border-r" },
                { label: "Total Invested", value: "$18M", border: "" },
              ].map((stat) => (
                <div key={stat.label} className={`p-8 lg:p-12 border-foreground ${stat.border}`}>
                  <p className="font-serif text-4xl lg:text-5xl mb-2">{stat.value}</p>
                  <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">
                    {stat.label} <span className="text-accent">→</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Types */}
        <section className="border-b border-foreground">
          <div className="px-8 py-6 border-b border-foreground">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
              Two Ways to Support <span className="text-accent">→</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2">
            {investmentTypes.map((type, idx) => (
              <div
                key={type.title}
                className={`flex flex-col ${idx === 0 ? "border-r border-foreground" : ""}`}
              >
                <div className={`px-8 py-4 border-b border-foreground ${
                  type.isInvest ? "bg-accent text-accent-foreground" : "bg-neon text-neon-foreground"
                }`}>
                  <div className="flex items-center gap-3">
                    <type.icon className="h-5 w-5" />
                    <div>
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className="text-sm opacity-80">{type.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8">
                  <ul className="space-y-4">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${
                          type.isInvest ? "text-accent" : ""
                        }`} style={{ color: type.isInvest ? undefined : 'var(--neon)' }} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href="/discover"
                  className={`mx-8 mb-8 flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-[0.05em] transition-colors border border-foreground ${
                    type.isInvest
                      ? "bg-accent text-accent-foreground hover:bg-foreground hover:text-background"
                      : "bg-neon text-neon-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  {type.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-foreground" id="how-it-works">
          <div className="px-8 py-6 border-b border-foreground">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
              Why Invest with Scholar <span className="text-accent">→</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => (
              <div 
                key={benefit.title} 
                className={`p-8 ${idx < benefits.length - 1 ? "border-r border-foreground" : ""} border-b md:border-b-0`}
              >
                <div className="w-12 h-12 flex items-center justify-center border border-foreground mb-4">
                  <benefit.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-16 border-r border-background/20">
              <h2 className="font-serif medium-title mb-4">
                Ready to make an impact?
              </h2>
              <p className="text-background/70 max-w-md">
                Join thousands of investors who are supporting the next generation 
                of innovators, researchers, and leaders.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 lg:p-16">
              <Link 
                href="/discover"
                className="flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-background hover:text-foreground transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
