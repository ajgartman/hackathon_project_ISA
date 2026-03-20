-- =============================================================
-- eduInvest — Supabase SQL Schema
-- Run this in the Supabase SQL Editor to create all tables.
-- =============================================================

-- Contracts table: stores ISA contracts between students and investors
CREATE TABLE contracts (
    id TEXT PRIMARY KEY,
    student_name TEXT NOT NULL,
    student_wallet TEXT NOT NULL,
    escrow_wallet TEXT NOT NULL,
    course TEXT NOT NULL,
    amount_needed NUMERIC NOT NULL,
    amount_funded NUMERIC DEFAULT 0,
    income_share_pct NUMERIC NOT NULL,
    repayment_cap NUMERIC NOT NULL,
    income_threshold NUMERIC NOT NULL,
    total_repaid NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'open',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table: records every Solana transaction
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    tx_signature TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    contract_id TEXT,
    actor TEXT,
    amount NUMERIC,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Investments table: tracks individual investor contributions
CREATE TABLE investments (
    id SERIAL PRIMARY KEY,
    contract_id TEXT NOT NULL,
    investor_name TEXT NOT NULL,
    investor_wallet TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    return_pct NUMERIC DEFAULT 0,
    timestamp TIMESTAMP DEFAULT NOW()
);
