import { Search, UserCheck, Wallet, TrendingUp, Heart } from "lucide-react"

const investorSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse profiles of exceptional students across various fields and institutions.",
  },
  {
    icon: UserCheck,
    title: "Evaluate",
    description: "Review academic records, achievements, research projects, and funding requirements.",
  },
  {
    icon: Wallet,
    title: "Support",
    description: "Choose to invest for returns or donate philanthropically—both make an impact.",
  },
  {
    icon: TrendingUp,
    title: "Track",
    description: "Monitor progress, receive updates, and watch your investment grow over time.",
  },
]

const studentSteps = [
  {
    icon: UserCheck,
    title: "Apply",
    description: "Create your profile showcasing academic achievements and funding needs.",
  },
  {
    icon: Search,
    title: "Get Discovered",
    description: "Your profile is reviewed and made visible to our network of investors.",
  },
  {
    icon: Heart,
    title: "Receive Funding",
    description: "Accept investments or donations to fund your education and research.",
  },
  {
    icon: TrendingUp,
    title: "Succeed",
    description: "Focus on your studies while building relationships with your supporters.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-b border-foreground">
      {/* Header */}
      <div className="px-8 py-6 border-b border-foreground">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
          How It Works <span className="text-accent">→</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* For Investors */}
        <div className="border-b lg:border-b-0 lg:border-r border-foreground">
          <div className="px-8 py-4 border-b border-foreground bg-accent text-accent-foreground">
            <h3 className="text-sm font-semibold uppercase tracking-[0.05em]">
              For Investors
            </h3>
          </div>
          <div className="divide-y divide-foreground">
            {investorSteps.map((step, index) => (
              <div key={step.title} className="grid grid-cols-[60px_1fr] hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center border-r border-foreground text-2xl font-serif">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-4 w-4 text-accent" />
                    <h4 className="font-semibold">{step.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Students */}
        <div>
          <div className="px-8 py-4 border-b border-foreground bg-neon text-neon-foreground">
            <h3 className="text-sm font-semibold uppercase tracking-[0.05em]">
              For Students
            </h3>
          </div>
          <div className="divide-y divide-foreground">
            {studentSteps.map((step, index) => (
              <div key={step.title} className="grid grid-cols-[60px_1fr] hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center border-r border-foreground text-2xl font-serif">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-4 w-4" style={{ color: 'var(--neon)' }} />
                    <h4 className="font-semibold">{step.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
