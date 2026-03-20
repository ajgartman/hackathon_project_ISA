"use client"

import { useState, useEffect, useCallback } from "react"

interface PhantomProvider {
  isPhantom: boolean
  connect: () => Promise<{ publicKey: { toString: () => string } }>
  disconnect: () => Promise<void>
  on: (event: string, callback: (...args: unknown[]) => void) => void
  isConnected: boolean
  publicKey: { toString: () => string } | null
}

function getPhantom(): PhantomProvider | null {
  if (typeof window === "undefined") return null
  const solana = (window as unknown as { solana?: PhantomProvider }).solana
  if (solana?.isPhantom) return solana
  return null
}

export function usePhantom() {
  const [wallet, setWallet] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [hasPhantom, setHasPhantom] = useState(false)

  useEffect(() => {
    const phantom = getPhantom()
    setHasPhantom(!!phantom)

    if (phantom?.isConnected && phantom.publicKey) {
      setWallet(phantom.publicKey.toString())
      setConnected(true)
    }
  }, [])

  const connect = useCallback(async () => {
    const phantom = getPhantom()
    if (!phantom) {
      window.open("https://phantom.app/", "_blank")
      return
    }

    try {
      const resp = await phantom.connect()
      const pubkey = resp.publicKey.toString()
      setWallet(pubkey)
      setConnected(true)
    } catch (err) {
      console.error("Phantom connect error:", err)
    }
  }, [])

  const disconnect = useCallback(async () => {
    const phantom = getPhantom()
    if (phantom) {
      await phantom.disconnect()
    }
    setWallet(null)
    setConnected(false)
  }, [])

  const shortAddress = wallet
    ? `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
    : null

  return { wallet, shortAddress, connected, hasPhantom, connect, disconnect }
}
