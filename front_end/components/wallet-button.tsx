"use client"

import { usePhantom } from "@/hooks/use-phantom"
import { Wallet, LogOut, ExternalLink } from "lucide-react"

export function WalletButton() {
  const { wallet, shortAddress, connected, hasPhantom, connect, disconnect } = usePhantom()

  if (connected && wallet) {
    return (
      <div className="flex items-center h-full">
        <a
          href={`https://explorer.solana.com/address/${wallet}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 h-full text-xs font-mono border-l border-foreground hover:bg-muted/50 transition-colors"
          title={wallet}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {shortAddress}
          <ExternalLink className="h-3 w-3 text-muted-foreground" />
        </a>
        <button
          onClick={disconnect}
          className="flex items-center gap-1 px-3 h-full text-xs border-l border-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"
          title="Disconnect wallet"
        >
          <LogOut className="h-3 w-3" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="flex items-center gap-2 px-5 h-full text-sm font-semibold border-l border-foreground hover:bg-purple-600 hover:text-white transition-colors"
    >
      <Wallet className="h-4 w-4" />
      <span className="hidden sm:inline">
        {hasPhantom ? "Connect Phantom" : "Get Phantom"}
      </span>
    </button>
  )
}
