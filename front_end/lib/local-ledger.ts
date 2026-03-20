/**
 * local-ledger.ts — Stores transactions in localStorage
 * Used as fallback when the backend is unreachable.
 * The portfolio page reads from both the API and local storage.
 */

export interface LocalTransaction {
  tx_signature: string
  type: string
  contract_id: string
  actor: string
  student_name: string
  course: string
  amount: number
  amount_funded: number
  amount_needed: number
  income_share_pct: number
  status: string
  explorer_url: string
  timestamp: string
  investor_wallet: string
  escrow_balance_sol: number
}

const STORAGE_KEY = "eduinvest_ledger"

export function saveTransaction(tx: LocalTransaction) {
  const existing = getTransactions()
  existing.unshift(tx)
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  }
}

export function getTransactions(): LocalTransaction[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getContracts(): {
  id: string
  student_name: string
  course: string
  amount_needed: number
  amount_funded: number
  income_share_pct: number
  total_repaid: number
  status: string
  created_at: string
}[] {
  const txs = getTransactions()
  // Group by contract_id to build contracts
  const contractMap = new Map<string, {
    id: string
    student_name: string
    course: string
    amount_needed: number
    amount_funded: number
    income_share_pct: number
    total_repaid: number
    status: string
    created_at: string
  }>()

  for (const tx of txs) {
    if (!contractMap.has(tx.contract_id)) {
      contractMap.set(tx.contract_id, {
        id: tx.contract_id,
        student_name: tx.student_name,
        course: tx.course,
        amount_needed: tx.amount_needed,
        amount_funded: tx.amount_funded,
        income_share_pct: tx.income_share_pct,
        total_repaid: 0,
        status: tx.status,
        created_at: tx.timestamp,
      })
    } else {
      const c = contractMap.get(tx.contract_id)!
      c.amount_funded = Math.max(c.amount_funded, tx.amount_funded)
      c.status = tx.status
    }
  }

  return Array.from(contractMap.values())
}

export function getStats() {
  const contracts = getContracts()
  const txs = getTransactions()
  return {
    totalFunded: contracts.reduce((sum, c) => sum + c.amount_funded, 0),
    totalRepaid: contracts.reduce((sum, c) => sum + c.total_repaid, 0),
    contractCount: contracts.length,
    transactionCount: txs.length,
    studentsSupported: new Set(contracts.map(c => c.student_name)).size,
  }
}
