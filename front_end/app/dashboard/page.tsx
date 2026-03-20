"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { listContracts, getLedger } from "@/lib/api"
import {
  GraduationCap,
  ArrowRight,
  ExternalLink,
  PoundSterling,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Loader2,
  Shield,
} from "lucide-react"
import Link from "next/link"

// Mock student data for the dashboard demo
const mockStudent = {
  name: "Alice Johnson",
  course: "BSc Computer Science — University of Birmingham",
  contract_id: "ISA-7F3A2B1C",
  student_wallet: "8xKt3v9pQmR2nBwY5cD7eF1gH4jL6kN0oP9qS2uT3vW",
  amount_needed: 15000,
  amount_funded: 8500,
  income_share_pct: 10,
  repayment_cap: 22500,
  income_threshold: 25000,
  total_repaid: 0,
  status: "open",
  investors: [
    { name: "Bob Smith", amount: 5000, date: "Mar 15, 2026" },
    { name: "Sarah Williams", amount: 2000, date: "Mar 17, 2026" },
    { name: "Anonymous Philanthropist", amount: 1500, date: "Mar 19, 2026" },
  ],
  milestones: [
    { title: "Contract Created", date: "Mar 14, 2026", done: true },
    { title: "First Investment Received", date: "Mar 15, 2026", done: true },
    { title: "50% Funded", date: "Mar 17, 2026", done: true },
    { title: "Fully Funded", date: "Pending", done: false },
    { title: "Graduation", date: "Jun 2028", done: false },
    { title: "Repayment Begins", date: "After income threshold", done: false },
  ],
}

interface Transaction {
  tx_signature: string
  type: string
  actor: string
  amount: number
  explorer_url: string
  timestamp: string
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "funding" | "repayment" | "transactions">("overview")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  // Try to load real data, fall back to mock
  const [student, setStudent] = useState(mockStudent)

  useEffect(() => {
    async function load() {
      try {
        const [contractsRes, ledgerRes] = await Promise.allSettled([
          listContracts(),
          getLedger(),
        ])

        if (contractsRes.status === "fulfilled" && contractsRes.value.contracts?.length > 0) {
          const c = contractsRes.value.contracts[0]
          setStudent((prev) => ({
            ...prev,
            name: c.student_name,
            course: c.course,
            contract_id: c.id,
            student_wallet: c.student_wallet,
            amount_needed: c.amount_needed,
            amount_funded: c.amount_funded,
            income_share_pct: c.income_share_pct,
            repayment_cap: c.repayment_cap || c.amount_needed * 1.5,
            income_threshold: c.income_threshold,
            total_repaid: c.total_repaid,
            status: c.status,
          }))
        }

        if (ledgerRes.status === "fulfilled") {
          setTransactions(ledgerRes.value.transactions || [])
        }
      } catch {
        // Use mock data
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const progress = student.amount_needed > 0
    ? Math.round((student.amount_funded / student.amount_needed) * 100)
    : 0

  const repaymentProgress = student.repayment_cap > 0
    ? Math.round((student.total_repaid / student.repayment_cap) * 100)
    : 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-foreground">
          <div className="px-8 py-6 border-b border-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GraduationCap className="h-5 w-5" style={{ color: "var(--neon)" }} />
              <div>
                <h1 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
                  Student Dashboard <span style={{ color: "var(--neon)" }}>→</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">Welcome back, {student.name}</p>
              </div>
            </div>
            <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider border ${
              student.status === "funded" ? "border-accent text-accent"
              : student.status === "complete" ? "border-foreground" : "border-foreground"
            }`} style={{ color: student.status === "complete" ? "var(--neon)" : undefined }}>
              {student.status}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="p-6 border-r border-b md:border-b-0 border-foreground">
              <div className="flex items-center gap-2 mb-2">
                <PoundSterling className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">Funding Goal</p>
              </div>
              <p className="font-serif text-3xl">£{student.amount_needed.toLocaleString()}</p>
            </div>
            <div className="p-6 border-r border-b md:border-b-0 border-foreground">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-3.5 w-3.5 text-accent" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">Raised</p>
              </div>
              <p className="font-serif text-3xl">£{student.amount_funded.toLocaleString()}</p>
              <p className="text-xs text-accent mt-1">{progress}% funded</p>
            </div>
            <div className="p-6 border-r border-b md:border-b-0 border-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">Investors</p>
              </div>
              <p className="font-serif text-3xl">{student.investors.length}</p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">Total Repaid</p>
              </div>
              <p className="font-serif text-3xl">£{student.total_repaid.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">of £{student.repayment_cap.toLocaleString()} cap</p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-b border-foreground">
          <div className="flex border-b border-foreground">
            {(["overview", "funding", "repayment", "transactions"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold uppercase tracking-[0.05em] border-r border-foreground transition-colors ${
                  activeTab === tab
                    ? "bg-foreground text-background"
                    : "hover:bg-muted/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2 border-r border-foreground">
                {/* Funding progress */}
                <div className="p-6 border-b border-foreground">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                    Funding Progress <span className="text-accent">→</span>
                  </div>
                  <div className="h-3 bg-muted mb-2">
                    <div
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>£{student.amount_funded.toLocaleString()} raised</span>
                    <span className="text-muted-foreground">£{(student.amount_needed - student.amount_funded).toLocaleString()} remaining</span>
                  </div>
                </div>

                {/* Contract details */}
                <div className="p-6 border-b border-foreground">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                    Contract Details <span className="text-accent">→</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="border border-foreground p-3">
                      <p className="text-muted-foreground text-xs mb-1">Contract ID</p>
                      <p className="font-mono font-semibold">{student.contract_id}</p>
                    </div>
                    <div className="border border-foreground p-3">
                      <p className="text-muted-foreground text-xs mb-1">Course</p>
                      <p className="font-semibold">{student.course}</p>
                    </div>
                    <div className="border border-foreground p-3">
                      <p className="text-muted-foreground text-xs mb-1">Income Share</p>
                      <p className="font-serif text-xl">{student.income_share_pct}%</p>
                    </div>
                    <div className="border border-foreground p-3">
                      <p className="text-muted-foreground text-xs mb-1">Income Threshold</p>
                      <p className="font-serif text-xl">£{student.income_threshold.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Wallet */}
                <div className="p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                    Your Solana Wallet <span className="text-accent">→</span>
                  </div>
                  <p className="font-mono text-xs break-all mb-3">{student.student_wallet}</p>
                  <a
                    href={`https://explorer.solana.com/address/${student.student_wallet}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View on Solana Explorer
                  </a>
                </div>
              </div>

              {/* Sidebar - milestones */}
              <div>
                <div className="px-6 py-4 border-b border-foreground">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
                    Milestones <span style={{ color: "var(--neon)" }}>→</span>
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {student.milestones.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 flex-shrink-0 ${m.done ? "" : "opacity-30"}`}>
                          {m.done ? (
                            <CheckCircle2 className="h-4 w-4" style={{ color: "var(--neon)" }} />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${m.done ? "" : "text-muted-foreground"}`}>
                            {m.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{m.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick action */}
                <div className="p-6 border-t border-foreground">
                  <Link
                    href="/discover"
                    className="flex items-center justify-between px-4 py-4 bg-neon text-neon-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors border border-foreground"
                  >
                    <span>Share Your Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Funding tab */}
          {activeTab === "funding" && (
            <div className="divide-y divide-foreground">
              <div className="px-6 py-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
                  Your Investors <span className="text-accent">→</span>
                </h3>
              </div>
              {student.investors.map((inv, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-foreground flex items-center justify-center bg-muted/30">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{inv.name}</p>
                      <p className="text-xs text-muted-foreground">{inv.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl">£{inv.amount.toLocaleString()}</p>
                    <p className="text-xs text-accent">Confirmed</p>
                  </div>
                </div>
              ))}
              <div className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Total: <span className="font-semibold">£{student.amount_funded.toLocaleString()}</span> from {student.investors.length} investors
                </p>
              </div>
            </div>
          )}

          {/* Repayment tab */}
          {activeTab === "repayment" && (
            <div className="p-8 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl mb-6">Repayment Overview</h3>

              <div className="border border-foreground p-6 mb-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                  How Your ISA Works
                </div>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-semibold">1.</span> You only start repaying when your annual income exceeds{" "}
                    <span className="font-semibold">£{student.income_threshold.toLocaleString()}</span>.
                  </p>
                  <p>
                    <span className="font-semibold">2.</span> When earning above the threshold, you pay{" "}
                    <span className="font-semibold">{student.income_share_pct}%</span> of your monthly income.
                  </p>
                  <p>
                    <span className="font-semibold">3.</span> Your total repayment is capped at{" "}
                    <span className="font-semibold">£{student.repayment_cap.toLocaleString()}</span> — you&apos;ll never pay more.
                  </p>
                  <p>
                    <span className="font-semibold">4.</span> All repayments are real Solana blockchain transactions, fully transparent.
                  </p>
                </div>
              </div>

              {/* Repayment progress */}
              <div className="border border-foreground p-6 mb-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                  Repayment Progress
                </div>
                <div className="h-3 bg-muted mb-2">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${repaymentProgress}%`, backgroundColor: "var(--neon)" }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>£{student.total_repaid.toLocaleString()} repaid</span>
                  <span className="text-muted-foreground">£{(student.repayment_cap - student.total_repaid).toLocaleString()} remaining</span>
                </div>
              </div>

              {/* Example repayment calculation */}
              <div className="border border-foreground p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4 text-muted-foreground">
                  Example Monthly Repayment
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">If earning £2,500/mo</p>
                    <p className="font-serif text-2xl">£{(2500 * student.income_share_pct / 100).toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">If earning £3,500/mo</p>
                    <p className="font-serif text-2xl">£{(3500 * student.income_share_pct / 100).toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">If earning £5,000/mo</p>
                    <p className="font-serif text-2xl">£{(5000 * student.income_share_pct / 100).toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions tab */}
          {activeTab === "transactions" && (
            <div className="divide-y divide-foreground">
              {loading && (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 mx-auto animate-spin text-accent mb-4" />
                </div>
              )}
              {!loading && transactions.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-sm text-muted-foreground">No blockchain transactions recorded yet.</p>
                </div>
              )}
              {transactions.map((tx) => (
                <div key={tx.tx_signature} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase border ${
                        tx.type === "FUND_ESCROW" ? "border-accent text-accent" : "border-foreground"
                      }`}>
                        {tx.type.replace("_", " ")}
                      </span>
                      <span className="text-xs text-muted-foreground">{tx.actor}</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground truncate max-w-md">
                      {tx.tx_signature}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">£{Number(tx.amount).toLocaleString()}</span>
                    <a
                      href={tx.explorer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 text-xs font-semibold border border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Verify
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
