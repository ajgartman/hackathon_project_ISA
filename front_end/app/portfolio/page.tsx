"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Briefcase,
  TrendingUp,
  Heart,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Calendar,
  ExternalLink,
  Loader2,
  Users,
  GraduationCap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { listContracts, getLedger, getEscrowBalance } from "@/lib/api"
import {
  getTransactions as getLocalTxs,
  getContracts as getLocalContracts,
  getStats as getLocalStats,
  type LocalTransaction,
} from "@/lib/local-ledger"

// Hardcoded display data for student images
const studentImages: Record<string, string> = {
  "Elena Rostova": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
  "David Chen": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
  "Amina Diallo": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
  "Marcus Vance": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  "Sarah Jenkins": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
}
const fallbackImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"

interface Contract {
  id: string
  student_name: string
  course: string
  amount_needed: number
  amount_funded: number
  income_share_pct: number
  total_repaid: number
  status: string
  created_at: string
}

interface Transaction {
  id?: number
  tx_signature: string
  type: string
  contract_id: string
  actor: string
  amount: number
  timestamp: string
  explorer_url: string
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "investments" | "ledger">("overview")
  const [contracts, setContracts] = useState<Contract[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [escrowBalance, setEscrowBalance] = useState<number | null>(null)
  const [escrowUrl, setEscrowUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      let apiContracts: Contract[] = []
      let apiTxs: Transaction[] = []

      try {
        const [contractsRes, ledgerRes, escrowRes] = await Promise.allSettled([
          listContracts(),
          getLedger(),
          getEscrowBalance(),
        ])
        if (contractsRes.status === "fulfilled") apiContracts = contractsRes.value.contracts || []
        if (ledgerRes.status === "fulfilled") apiTxs = ledgerRes.value.transactions || []
        if (escrowRes.status === "fulfilled") {
          setEscrowBalance(escrowRes.value.balance_sol)
          setEscrowUrl(escrowRes.value.explorer_url || "")
        }
      } catch {
        // API unavailable
      }

      // Merge with local ledger data
      const localContracts = getLocalContracts()
      const localTxs = getLocalTxs()

      // Deduplicate by id/signature
      const contractIds = new Set(apiContracts.map((c) => c.id))
      for (const lc of localContracts) {
        if (!contractIds.has(lc.id)) {
          apiContracts.push(lc)
        }
      }

      const txSigs = new Set(apiTxs.map((t) => t.tx_signature))
      for (const lt of localTxs) {
        if (!txSigs.has(lt.tx_signature)) {
          apiTxs.push({
            tx_signature: lt.tx_signature,
            type: lt.type,
            contract_id: lt.contract_id,
            actor: lt.actor,
            amount: lt.amount,
            timestamp: lt.timestamp,
            explorer_url: lt.explorer_url,
          })
        }
      }

      // If no escrow balance from API, estimate from local
      if (escrowBalance === null && localTxs.length > 0) {
        setEscrowBalance(localTxs[0].escrow_balance_sol)
      }

      setContracts(apiContracts)
      setTransactions(apiTxs)
      setLoading(false)
    }
    fetchData()
  }, [])

  const totalFunded = contracts.reduce((acc, c) => acc + Number(c.amount_funded), 0)
  const totalRepaid = contracts.reduce((acc, c) => acc + Number(c.total_repaid || 0), 0)
  const activeContracts = contracts.filter((c) => c.status !== "complete")
  const studentsSupported = new Set(contracts.map((c) => c.student_name)).size

  // Static updates for overview
  const updates = [
    {
      id: "1",
      studentName: "David Chen",
      studentImage: studentImages["David Chen"],
      date: "2 days ago",
      title: "Research Milestone Achieved",
      content: "My paper on quantum error correction has been accepted to Nature Physics! Thank you to all my investors.",
    },
    {
      id: "2",
      studentName: "Elena Rostova",
      studentImage: studentImages["Elena Rostova"],
      date: "1 week ago",
      title: "Hackathon Victory",
      content: "Our team won 1st place at the Global Eco-Design Hackathon!",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-foreground">
          <div className="px-8 py-6 border-b border-foreground flex items-center gap-4">
            <Briefcase className="h-5 w-5" />
            <div>
              <h1 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
                Your Portfolio <span className="text-accent">→</span>
              </h1>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5">
            <div className="p-6 border-r border-b md:border-b-0 border-foreground">
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-2">
                Total Funded
              </p>
              <p className="font-serif text-3xl">
                {loading ? "..." : `£${totalFunded.toLocaleString()}`}
              </p>
              <p className="text-xs text-accent mt-1">{contracts.length} contracts</p>
            </div>
            <div className="p-6 border-r border-b md:border-b-0 border-foreground">
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-2">
                Total Repaid
              </p>
              <p className="font-serif text-3xl">
                {loading ? "..." : `£${totalRepaid.toLocaleString()}`}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--neon)" }}>ISA repayments</p>
            </div>
            <div className="p-6 border-r border-b md:border-b-0 border-foreground">
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-2">
                Students Supported
              </p>
              <p className="font-serif text-3xl">
                {loading ? "..." : studentsSupported}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Unique students</p>
            </div>
            <div className="p-6 border-r border-b md:border-b-0 border-foreground">
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-2">
                Transactions
              </p>
              <p className="font-serif text-3xl">
                {loading ? "..." : transactions.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">On Solana devnet</p>
            </div>
            <div className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-2">
                Escrow Balance
              </p>
              <p className="font-serif text-3xl">
                {loading ? "..." : escrowBalance !== null ? `${escrowBalance} SOL` : "—"}
              </p>
              {escrowUrl ? (
                <a
                  href={escrowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-accent mt-1 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  View on Explorer
                </a>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">Solana devnet</p>
              )}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-b border-foreground">
          <div className="flex border-b border-foreground">
            {["overview", "investments", "ledger"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
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

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3">
              {/* Recent activity + funded students */}
              <div className="lg:col-span-2 border-r border-foreground">
                {/* Funded students summary */}
                {contracts.length > 0 && (
                  <>
                    <div className="px-6 py-4 border-b border-foreground">
                      <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
                        Funded Students <span className="text-accent">→</span>
                      </h2>
                    </div>
                    <div className="divide-y divide-foreground">
                      {contracts.slice(0, 5).map((contract) => {
                        const progress = contract.amount_needed > 0
                          ? Math.round((Number(contract.amount_funded) / Number(contract.amount_needed)) * 100)
                          : 0
                        const image = studentImages[contract.student_name] || fallbackImage

                        return (
                          <div key={contract.id} className="p-6 flex items-center gap-4">
                            <div className="relative h-12 w-12 overflow-hidden border border-foreground flex-shrink-0">
                              <Image
                                src={image}
                                alt={contract.student_name}
                                fill
                                className="object-cover grayscale-img"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold truncate">{contract.student_name}</h3>
                                <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border flex-shrink-0 ml-2 ${
                                  contract.status === "funded" ? "border-accent text-accent"
                                  : contract.status === "complete" ? "border-foreground" : "border-foreground"
                                }`} style={{ color: contract.status === "complete" ? "var(--neon)" : undefined }}>
                                  {contract.status}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2 truncate">{contract.course}</p>
                              <div className="h-1.5 bg-muted">
                                <div className="h-full bg-accent transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span className="font-semibold">£{Number(contract.amount_funded).toLocaleString()}</span>
                                <span className="text-muted-foreground">{progress}% of £{Number(contract.amount_needed).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}

                {/* Updates */}
                <div className="px-6 py-4 border-b border-t border-foreground">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
                    Recent Updates <span className="text-accent">→</span>
                  </h2>
                </div>
                <div className="divide-y divide-foreground">
                  {updates.map((update) => (
                    <div key={update.id} className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative h-10 w-10 overflow-hidden border border-foreground">
                          <Image
                            src={update.studentImage}
                            alt={update.studentName}
                            fill
                            className="object-cover grayscale-img"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{update.studentName}</p>
                          <p className="text-xs text-muted-foreground">{update.date}</p>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">{update.title}</h3>
                      <p className="text-sm text-muted-foreground">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="px-6 py-4 border-b border-foreground">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
                    Quick Actions <span className="text-accent">→</span>
                  </h2>
                </div>
                <div className="p-6 space-y-3 border-b border-foreground">
                  <Link
                    href="/discover"
                    className="flex items-center justify-between px-4 py-4 bg-accent text-accent-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors border border-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Find New Investments
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/discover"
                    className="flex items-center justify-between px-4 py-4 bg-neon text-neon-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors border border-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Make a Donation
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Portfolio summary */}
                <div className="p-6 border-b border-foreground">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4">
                    Impact Summary <span style={{ color: "var(--neon)" }}>→</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{studentsSupported} students supported</p>
                        <p className="text-xs text-muted-foreground">Across multiple fields</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{transactions.length} blockchain transactions</p>
                        <p className="text-xs text-muted-foreground">All verifiable on Solana</p>
                      </div>
                    </div>
                    {totalFunded > 0 && (
                      <div className="flex items-center gap-3">
                        <ArrowUpRight className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-semibold">£{totalFunded.toLocaleString()} total committed</p>
                          <p className="text-xs text-muted-foreground">Through ISA contracts</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] mb-4">
                    Upcoming <span className="text-accent">→</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Quarterly Report</p>
                        <p className="text-xs text-muted-foreground">Apr 1, 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">David Chen - Thesis Defense</p>
                        <p className="text-xs text-muted-foreground">May 15, 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Investments Tab */}
          {activeTab === "investments" && (
            <div className="divide-y divide-foreground">
              {loading && (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 mx-auto animate-spin text-accent mb-4" />
                  <p className="text-sm text-muted-foreground">Loading contracts...</p>
                </div>
              )}
              {!loading && contracts.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-sm text-muted-foreground mb-4">No contracts yet.</p>
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
                  >
                    Discover Students <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
              {contracts.map((contract) => {
                const progress = contract.amount_needed > 0
                  ? Math.round((Number(contract.amount_funded) / Number(contract.amount_needed)) * 100)
                  : 0
                const image = studentImages[contract.student_name] || fallbackImage

                return (
                  <div
                    key={contract.id}
                    className="grid md:grid-cols-[1fr_auto] gap-4 p-6 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden border border-foreground">
                        <Image src={image} alt={contract.student_name} fill className="object-cover grayscale-img" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{contract.student_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contract.course} · ISA {contract.income_share_pct}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Contract: {contract.id}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Funded</p>
                        <div className="w-24 h-1.5 bg-muted">
                          <div className="h-full bg-accent" style={{ width: `${Math.min(progress, 100)}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{progress}%</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">£{Number(contract.amount_funded).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">of £{Number(contract.amount_needed).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Repaid</p>
                        <p className="font-semibold" style={{ color: Number(contract.total_repaid) > 0 ? "var(--neon)" : undefined }}>
                          £{Number(contract.total_repaid || 0).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border ${
                        contract.status === "funded" ? "border-accent text-accent"
                        : contract.status === "complete" ? "border-foreground" : "border-foreground"
                      }`} style={{ color: contract.status === "complete" ? "var(--neon)" : undefined }}>
                        {contract.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Ledger Tab */}
          {activeTab === "ledger" && (
            <div className="divide-y divide-foreground">
              {loading && (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 mx-auto animate-spin text-accent mb-4" />
                  <p className="text-sm text-muted-foreground">Loading transactions...</p>
                </div>
              )}
              {!loading && transactions.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-sm text-muted-foreground">No transactions recorded yet.</p>
                </div>
              )}
              {transactions.map((tx, idx) => (
                <div
                  key={tx.tx_signature + idx}
                  className="grid md:grid-cols-[1fr_auto] gap-4 p-6 hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                        tx.type === "FUND_ESCROW" ? "border-accent text-accent"
                        : tx.type === "DONATION" ? "border-foreground" : "border-foreground"
                      }`} style={{ color: tx.type === "REPAYMENT" ? "var(--neon)" : tx.type === "DONATION" ? "var(--neon)" : undefined }}>
                        {tx.type.replace("_", " ")}
                      </span>
                      <span className="text-xs text-muted-foreground">{tx.contract_id}</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-semibold">{tx.actor}</span>
                      {tx.type === "FUND_ESCROW" && " invested"}
                      {tx.type === "DONATION" && " donated"}
                      {tx.type === "REPAYMENT" && " repaid"}
                      {tx.type === "CREATE_ISA" && " created contract"}
                      {" "}
                      <span className="font-semibold">£{Number(tx.amount).toLocaleString()}</span>
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-1 truncate max-w-md">
                      TX: {tx.tx_signature}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </span>
                    <a
                      href={tx.explorer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 text-xs font-semibold border border-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors whitespace-nowrap"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Explorer
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
