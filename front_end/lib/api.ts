/**
 * api.ts — API client for eduInvest Flask backend
 * All calls go to the Flask server running on localhost:5000
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "API request failed")
  return data
}

// --- Contracts ---

export async function createContract(body: {
  student_name: string
  course: string
  amount_needed: number
  income_share_pct: number
  repayment_cap: number
  income_threshold: number
}) {
  return apiFetch("/api/contracts/create", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function fundContract(body: {
  contract_id: string
  investor_name: string
  amount: number
  return_pct: number
}) {
  return apiFetch("/api/contracts/fund", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function repayContract(body: {
  contract_id: string
  monthly_income: number
}) {
  return apiFetch("/api/contracts/repay", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function listContracts() {
  return apiFetch("/api/contracts")
}

export async function getContract(contractId: string) {
  return apiFetch(`/api/contracts/${contractId}`)
}

// --- Ledger ---

export async function getLedger() {
  return apiFetch("/api/ledger")
}

// --- Escrow ---

export async function getEscrowBalance() {
  return apiFetch("/api/escrow/balance")
}

export async function setupEscrow() {
  return apiFetch("/api/setup/escrow", { method: "POST" })
}
