"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Shield, Zap, Lock } from "lucide-react"
import { getEscrowBalance, getLedger } from "@/lib/api"

interface Transaction {
  tx_signature: string
  type: string
  actor: string
  amount: number
  explorer_url: string
  timestamp: string
}

export function BlockchainProof() {
  const [escrow, setEscrow] = useState<{ wallet: string; balance: number; url: string } | null>(null)
  const [recentTxs, setRecentTxs] = useState<Transaction[]>([])

  useEffect(() => {
    getEscrowBalance()
      .then((res) => setEscrow({
        wallet: res.escrow_wallet,
        balance: res.balance_sol,
        url: res.explorer_url,
      }))
      .catch(() => {})

    getLedger()
      .then((res) => setRecentTxs((res.transactions || []).slice(0, 3)))
      .catch(() => {})
  }, [])

  return (
    <section className="border-b border-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-foreground">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em]">
            Blockchain Verified <span className="text-accent">→</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 border border-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Solana Devnet — Live
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        {/* Feature cards */}
        <div className="p-8 border-r border-b md:border-b-0 border-foreground">
          <Shield className="h-6 w-6 text-accent mb-4" />
          <h3 className="font-serif text-xl mb-2">Transparent</h3>
          <p className="text-sm text-muted-foreground">
            Every ISA contract and investment is recorded on the Solana blockchain.
            Click any transaction to verify it on Solana Explorer.
          </p>
        </div>

        <div className="p-8 border-r border-b md:border-b-0 border-foreground">
          <Zap className="h-6 w-6 mb-4" style={{ color: "var(--neon)" }} />
          <h3 className="font-serif text-xl mb-2">Instant</h3>
          <p className="text-sm text-muted-foreground">
            Solana processes transactions in under 1 second with fees under $0.01.
            Funds reach students almost instantly.
          </p>
        </div>

        <div className="p-8 border-b md:border-b-0 border-foreground">
          <Lock className="h-6 w-6 text-accent mb-4" />
          <h3 className="font-serif text-xl mb-2">Secure Escrow</h3>
          <p className="text-sm text-muted-foreground">
            Funds are held in a platform escrow wallet. Repayments only trigger when
            income exceeds the agreed threshold.
          </p>
        </div>
      </div>

      {/* Live data strip */}
      <div className="border-t border-foreground">
        <div className="grid md:grid-cols-[1fr_2fr]">
          {/* Escrow balance */}
          <div className="p-6 border-r border-foreground">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-2">
              Platform Escrow
            </div>
            {escrow ? (
              <>
                <p className="font-serif text-3xl mb-1">{escrow.balance} SOL</p>
                <a
                  href={escrow.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  View on Solana Explorer
                </a>
              </>
            ) : (
              <p className="font-serif text-3xl text-muted-foreground">—</p>
            )}
          </div>

          {/* Recent transactions */}
          <div className="p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground mb-3">
              Recent On-Chain Transactions
            </div>
            {recentTxs.length > 0 ? (
              <div className="space-y-2">
                {recentTxs.map((tx) => (
                  <div key={tx.tx_signature} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase border border-foreground">
                        {tx.type.replace("_", " ")}
                      </span>
                      <span className="text-muted-foreground">{tx.actor}</span>
                      <span className="font-semibold">${Number(tx.amount).toLocaleString()}</span>
                    </div>
                    <a
                      href={tx.explorer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Verify
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No transactions yet — invest in a student to create the first on-chain record.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
