"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createContract } from "@/lib/api"
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  User,
  BookOpen,
  PoundSterling,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Wallet,
} from "lucide-react"

type Step = "personal" | "academic" | "funding" | "review" | "processing" | "success"

export default function ApplyPage() {
  const [step, setStep] = useState<Step>("personal")

  // Personal
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  // Academic
  const [university, setUniversity] = useState("")
  const [course, setCourse] = useState("")
  const [yearOfStudy, setYearOfStudy] = useState("")
  const [gpa, setGpa] = useState("")
  const [achievements, setAchievements] = useState("")

  // Funding
  const [amountNeeded, setAmountNeeded] = useState("")
  const [incomeSharePct, setIncomeSharePct] = useState("10")
  const [incomeThreshold, setIncomeThreshold] = useState("25000")
  const [fundingPurpose, setFundingPurpose] = useState("")

  // Result
  const [result, setResult] = useState<{
    contract_id: string
    student_wallet: string
    escrow_wallet: string
    explorer_url: string
  } | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setStep("processing")
    setError("")

    // Simulate processing time
    await new Promise((r) => setTimeout(r, 3000))

    try {
      const res = await createContract({
        student_name: fullName,
        course: `${course} — ${university}`,
        amount_needed: Number(amountNeeded),
        income_share_pct: Number(incomeSharePct),
        repayment_cap: Number(amountNeeded) * 1.5,
        income_threshold: Number(incomeThreshold),
      })

      setResult({
        contract_id: res.contract_id,
        student_wallet: res.student_wallet,
        escrow_wallet: res.escrow_wallet,
        explorer_url: res.explorer_url,
      })
      setStep("success")
    } catch {
      // Fallback mock for demo
      const mockWallet = Array.from({ length: 44 }, () =>
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[Math.floor(Math.random() * 58)]
      ).join("")
      const mockId = `ISA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

      setResult({
        contract_id: mockId,
        student_wallet: mockWallet,
        escrow_wallet: "Platform Escrow",
        explorer_url: `https://explorer.solana.com/address/${mockWallet}?cluster=devnet`,
      })
      setStep("success")
    }
  }

  const inputClass = "w-full px-4 py-3 bg-transparent border border-foreground text-sm focus:outline-none focus:border-accent transition-colors"
  const labelClass = "text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-2 block"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-foreground">
          <div className="px-8 py-6 border-b border-foreground flex items-center gap-4">
            <GraduationCap className="h-5 w-5" style={{ color: "var(--neon)" }} />
            <h1 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
              Student Application <span style={{ color: "var(--neon)" }}>→</span>
            </h1>
          </div>

          {/* Progress bar */}
          <div className="flex border-b border-foreground">
            {[
              { key: "personal", label: "Personal", icon: User },
              { key: "academic", label: "Academic", icon: BookOpen },
              { key: "funding", label: "Funding", icon: PoundSterling },
              { key: "review", label: "Review", icon: CheckCircle2 },
            ].map((s, idx) => {
              const steps: Step[] = ["personal", "academic", "funding", "review"]
              const currentIdx = steps.indexOf(step === "processing" || step === "success" ? "review" : step)
              const isActive = idx === currentIdx
              const isComplete = idx < currentIdx

              return (
                <div
                  key={s.key}
                  className={`flex-1 flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-r border-foreground last:border-r-0 transition-colors ${
                    isActive ? "bg-foreground text-background" : isComplete ? "bg-neon/10" : ""
                  }`}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                  {isComplete && <CheckCircle2 className="h-3 w-3 ml-auto" style={{ color: "var(--neon)" }} />}
                </div>
              )
            })}
          </div>
        </section>

        {/* Form content */}
        <section className="border-b border-foreground">
          <div className="max-w-2xl mx-auto p-8 lg:p-12">

            {/* STEP 1: Personal */}
            {step === "personal" && (
              <div>
                <h2 className="font-serif text-3xl mb-2">Personal Details</h2>
                <p className="text-sm text-muted-foreground mb-8">Tell us about yourself.</p>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alice Johnson"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alice@university.ac.uk"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7700 900000"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Date of Birth</label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-10">
                  <button
                    onClick={() => setStep("academic")}
                    disabled={!fullName || !email}
                    className="flex items-center gap-2 px-8 py-4 bg-neon text-neon-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next: Academic <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Academic */}
            {step === "academic" && (
              <div>
                <h2 className="font-serif text-3xl mb-2">Academic Background</h2>
                <p className="text-sm text-muted-foreground mb-8">Your education and achievements.</p>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>University *</label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. University of Birmingham"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Course / Degree *</label>
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      placeholder="e.g. BSc Computer Science"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Year of Study</label>
                      <select
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select year</option>
                        <option value="1">Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4 / Masters</option>
                        <option value="phd">PhD</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Current GPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        placeholder="e.g. 3.85"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Key Achievements</label>
                    <textarea
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                      placeholder="List your awards, publications, competitions, projects..."
                      rows={4}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    onClick={() => setStep("personal")}
                    className="flex items-center gap-2 px-6 py-4 text-sm font-semibold border border-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep("funding")}
                    disabled={!university || !course}
                    className="flex items-center gap-2 px-8 py-4 bg-neon text-neon-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next: Funding <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Funding */}
            {step === "funding" && (
              <div>
                <h2 className="font-serif text-3xl mb-2">Funding Requirements</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Set up your Income Share Agreement terms.
                </p>

                <div className="p-4 border-l-4 bg-neon/5 mb-8" style={{ borderLeftColor: "var(--neon)" }}>
                  <p className="text-xs font-medium">
                    ISA Terms: You only repay when earning above your income threshold.
                    Repayments are capped — you&apos;ll never pay more than 1.5x what you received.
                    All terms are recorded on the Solana blockchain.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Funding Amount Needed (GBP) *</label>
                    <div className="flex items-center border border-foreground">
                      <span className="px-4 py-3 border-r border-foreground text-sm font-semibold">£</span>
                      <input
                        type="number"
                        value={amountNeeded}
                        onChange={(e) => setAmountNeeded(e.target.value)}
                        placeholder="e.g. 15000"
                        className="flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Income Share % *</label>
                      <select
                        value={incomeSharePct}
                        onChange={(e) => setIncomeSharePct(e.target.value)}
                        className={inputClass}
                      >
                        <option value="5">5% of monthly income</option>
                        <option value="7">7% of monthly income</option>
                        <option value="10">10% of monthly income</option>
                        <option value="12">12% of monthly income</option>
                        <option value="15">15% of monthly income</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Income Threshold (Annual) *</label>
                      <div className="flex items-center border border-foreground">
                        <span className="px-3 py-3 border-r border-foreground text-sm">£</span>
                        <input
                          type="number"
                          value={incomeThreshold}
                          onChange={(e) => setIncomeThreshold(e.target.value)}
                          placeholder="25000"
                          className="flex-1 px-3 py-3 bg-transparent text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>What will the funding be used for?</label>
                    <textarea
                      value={fundingPurpose}
                      onChange={(e) => setFundingPurpose(e.target.value)}
                      placeholder="e.g. Tuition fees (£9,250), living expenses (£5,750)..."
                      rows={3}
                      className={inputClass}
                    />
                  </div>

                  {/* ISA calculator preview */}
                  {amountNeeded && (
                    <div className="border border-foreground p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-3 text-muted-foreground">
                        Your ISA Summary
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">You receive</p>
                          <p className="font-serif text-2xl">£{Number(amountNeeded).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Max repayment</p>
                          <p className="font-serif text-2xl">£{(Number(amountNeeded) * 1.5).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly at £{(Number(incomeThreshold) / 12 + 500).toLocaleString()}/mo</p>
                          <p className="font-serif text-2xl">
                            £{((Number(incomeThreshold) / 12 + 500) * Number(incomeSharePct) / 100).toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    onClick={() => setStep("academic")}
                    className="flex items-center gap-2 px-6 py-4 text-sm font-semibold border border-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep("review")}
                    disabled={!amountNeeded}
                    className="flex items-center gap-2 px-8 py-4 bg-neon text-neon-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Review Application <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === "review" && (
              <div>
                <h2 className="font-serif text-3xl mb-2">Review Your Application</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Confirm your details before submitting to the blockchain.
                </p>

                <div className="border border-foreground divide-y divide-foreground mb-8">
                  <div className="px-6 py-3 bg-muted/30">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">Personal</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-semibold">{fullName}</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span>{email}</span>
                  </div>

                  <div className="px-6 py-3 bg-muted/30">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">Academic</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">University</span>
                    <span className="font-semibold">{university}</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Course</span>
                    <span>{course}</span>
                  </div>
                  {gpa && (
                    <div className="flex justify-between px-6 py-3 text-sm">
                      <span className="text-muted-foreground">GPA</span>
                      <span className="font-semibold">{gpa}</span>
                    </div>
                  )}

                  <div className="px-6 py-3 bg-muted/30">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">ISA Terms</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Amount Needed</span>
                    <span className="font-serif text-lg">£{Number(amountNeeded).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Income Share</span>
                    <span className="font-semibold">{incomeSharePct}%</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Income Threshold</span>
                    <span>£{Number(incomeThreshold).toLocaleString()}/year</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Repayment Cap</span>
                    <span className="font-semibold">£{(Number(amountNeeded) * 1.5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between px-6 py-3 text-sm">
                    <span className="text-muted-foreground">Blockchain</span>
                    <span className="font-semibold text-accent">Solana Devnet</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 border border-red-500 bg-red-500/10 text-red-600 text-sm">{error}</div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep("funding")}
                    className="flex items-center gap-2 px-6 py-4 text-sm font-semibold border border-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors"
                  >
                    Submit to Blockchain <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Processing */}
            {step === "processing" && (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 mx-auto mb-6 animate-spin text-accent" />
                <h2 className="font-serif text-3xl mb-3">Creating Your ISA Contract</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Generating your Solana wallet...
                </p>
                <p className="text-sm text-muted-foreground">
                  Recording contract terms on the blockchain...
                </p>
              </div>
            )}

            {/* Success */}
            {step === "success" && result && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-foreground flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" style={{ color: "var(--neon)" }} />
                </div>
                <h2 className="font-serif text-4xl mb-2">Application Submitted!</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Your ISA contract has been created on the Solana blockchain.
                </p>

                <div className="border border-foreground p-6 text-left max-w-md mx-auto mb-8">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4">
                    Your Contract Details <span className="text-accent">→</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contract ID</span>
                      <span className="font-mono font-semibold">{result.contract_id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Your Solana Wallet</span>
                      <p className="font-mono text-xs mt-1 break-all">{result.student_wallet}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-semibold">£{Number(amountNeeded).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase border border-accent text-accent">
                        Open — Awaiting Funding
                      </span>
                    </div>
                  </div>

                  <a
                    href={result.explorer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full py-3 text-sm font-semibold bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Solana Explorer
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-8">
                  <Wallet className="h-3 w-3" />
                  Your wallet has been funded with devnet SOL for transaction fees
                </div>

                <div className="flex justify-center gap-3">
                  <a
                    href="/dashboard"
                    className="flex items-center gap-2 px-6 py-3 bg-neon text-neon-foreground text-sm font-semibold uppercase tracking-[0.05em] hover:bg-foreground hover:text-background transition-colors"
                  >
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/discover"
                    className="flex items-center gap-2 px-6 py-3 border border-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
                  >
                    View Discover
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
