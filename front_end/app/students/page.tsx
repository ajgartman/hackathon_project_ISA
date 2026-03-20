import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ArrowRight, GraduationCap, Lightbulb, Users, Trophy, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Showcase your academic achievements, research interests, and funding needs in a compelling profile.",
  },
  {
    step: "02",
    title: "Get Verified",
    description: "Our team reviews your application and verifies your academic credentials and enrollment status.",
  },
  {
    step: "03",
    title: "Go Live",
    description: "Your profile becomes visible to our network of investors and donors seeking to support talent.",
  },
  {
    step: "04",
    title: "Receive Funding",
    description: "Accept investments or donations and use the funds for tuition, research, and living expenses.",
  },
]

const eligibility = [
  "Currently enrolled in an accredited university",
  "Maintaining a GPA of 3.5 or higher",
  "Pursuing a degree in STEM, Business, or Arts",
  "Demonstrated financial need or research funding gap",
  "Strong academic record and achievements",
  "Clear career goals and funding plan",
]

const successStories = [
  {
    name: "Maya Rodriguez",
    field: "Neuroscience PhD",
    university: "UC Berkeley",
    raised: "$48,000",
    quote: "Scholar connected me with investors who believed in my research before anyone else did. Now I'm leading a groundbreaking study on memory formation.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "James Okonkwo",
    field: "Computer Science",
    university: "Carnegie Mellon",
    raised: "$35,000",
    quote: "As a first-generation college student, Scholar gave me the financial freedom to focus on my studies instead of working multiple jobs.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
  },
]

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground">
          <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] bg-neon blob-shape opacity-60 pointer-events-none" />
          
          <div className="relative grid lg:grid-cols-2">
            <div className="p-8 lg:p-16 border-r border-foreground">
              <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4" style={{ color: 'var(--neon)' }}>
                For Students →
              </div>
              <h1 className="font-serif huge-title mb-8">
                <span className="text-balance">Fund your</span>
                <br />
                <span className="text-balance">education,</span>
                <br />
                <span style={{ color: 'var(--neon)' }}>pursue dreams</span>
              </h1>
              
              <p className="max-w-md text-base leading-relaxed mb-10">
                Connect with investors and donors who believe in your potential. 
                Get the funding you need to focus on what matters—your education.
              </p>

              <div className="flex flex-wrap gap-0">
                <Link 
                  href="/apply"
                  className="flex items-center gap-2 px-6 py-4 bg-neon text-neon-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors border border-foreground"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="#eligibility"
                  className="flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors border border-foreground border-l-0"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2">
              {[
                { icon: GraduationCap, label: "2,400+", desc: "Students Funded", border: "border-b border-r" },
                { icon: Trophy, label: "92%", desc: "Graduation Rate", border: "border-b" },
                { icon: Users, label: "45", desc: "Partner Universities", border: "border-r" },
                { icon: Lightbulb, label: "85+", desc: "Fields of Study", border: "" },
              ].map((stat) => (
                <div key={stat.label} className={`p-8 lg:p-10 border-foreground ${stat.border} flex flex-col items-center justify-center text-center`}>
                  <stat.icon className="h-8 w-8 mb-3" style={{ color: 'var(--neon)' }} />
                  <p className="font-serif text-4xl mb-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-foreground">
          <div className="px-8 py-6 border-b border-foreground">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
              How to Get Started <span style={{ color: 'var(--neon)' }}>→</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, idx) => (
              <div 
                key={item.step} 
                className={`p-8 ${idx < steps.length - 1 ? "border-r border-foreground" : ""} border-b md:border-b-0`}
              >
                <div className="text-6xl font-serif opacity-20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section className="border-b border-foreground" id="eligibility">
          <div className="px-8 py-6 border-b border-foreground">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
              Eligibility Requirements <span style={{ color: 'var(--neon)' }}>→</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12 border-r border-foreground">
              <p className="text-muted-foreground mb-8">
                We look for exceptional students who demonstrate academic excellence, 
                clear goals, and genuine financial need.
              </p>

              <ul className="space-y-4">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: 'var(--neon)' }} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/apply"
                className="inline-flex items-center gap-2 mt-8 px-6 py-4 bg-neon text-neon-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors border border-foreground"
              >
                Start Your Application
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Illustration area */}
            <div className="relative p-8 lg:p-12 bg-muted/30">
              <div className="absolute top-8 right-8 w-32 h-32 bg-neon blob-shape opacity-40" />
              <div className="absolute bottom-12 left-12 w-24 h-24 bg-accent blob-shape opacity-30" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="font-serif text-6xl mb-4">3.5+</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
                    Minimum GPA Required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="border-b border-foreground">
          <div className="px-8 py-6 border-b border-foreground">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
              Success Stories <span style={{ color: 'var(--neon)' }}>→</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2">
            {successStories.map((story, idx) => (
              <div 
                key={story.name} 
                className={`p-8 lg:p-12 ${idx === 0 ? "border-r border-foreground" : ""}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 overflow-hidden border border-foreground">
                    <Image 
                      src={story.image} 
                      alt={story.name} 
                      width={64}
                      height={64}
                      className="h-full w-full object-cover grayscale-img" 
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {story.field} · {story.university}
                    </p>
                  </div>
                </div>
                <blockquote className="text-base leading-relaxed border-l-4 border-foreground pl-4 mb-6">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <p className="text-lg font-semibold" style={{ color: 'var(--neon)' }}>
                  Raised: {story.raised}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-16 border-r border-background/20">
              <h2 className="font-serif medium-title mb-4">
                Your future starts here
              </h2>
              <p className="text-background/70 max-w-md">
                Join thousands of students who have funded their education through 
                Scholar. Applications are reviewed within 5 business days.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 lg:p-16">
              <Link 
                href="/apply"
                className="flex items-center gap-2 px-8 py-4 bg-neon text-neon-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-background hover:text-foreground transition-colors"
              >
                Apply Now
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
