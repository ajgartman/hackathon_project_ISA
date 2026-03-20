# eduInvest — Solana-Based Income Share Agreement Platform

A Python Flask backend for a decentralised ISA (Income Share Agreement) platform built on **Solana devnet**. Every transaction is a **real on-chain blockchain transaction** — click any Explorer link to verify.

## Tech Stack

- **Python + Flask** — REST API backend
- **Supabase** — PostgreSQL database (contracts, investments, transactions)
- **Solana devnet** — Real blockchain transactions via `solana-py` + `solders`
- **No Rust, no Anchor** — Pure Python Solana integration

## Setup

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Create Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the **SQL Editor** and paste the contents of `supabase_schema.sql`
3. Run the SQL to create the `contracts`, `transactions`, and `investments` tables

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in your Supabase credentials:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

### 4. Start the server (first time)

```bash
python app.py
```

### 5. Create the escrow wallet (one-time setup)

```bash
curl -X POST http://localhost:5000/api/setup/escrow
```

Copy the `public_key` and `secret_key` from the response into your `.env` file:

```
ESCROW_PUBLIC_KEY=<public_key from response>
ESCROW_SECRET_KEY=<secret_key JSON array from response>
```

### 6. Restart the server

```bash
python app.py
```

The server is now fully configured and ready to use.

## API Endpoints

### Setup

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/setup/escrow` | Create escrow wallet (one-time) |

### Contracts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contracts/create` | Create a new ISA contract |
| POST | `/api/contracts/fund` | Fund a contract (investor) |
| POST | `/api/contracts/repay` | Make income-based repayment |
| GET | `/api/contracts` | List all contracts |
| GET | `/api/contracts/<id>` | Get contract + investments |

### Ledger & Balance

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ledger` | Last 20 transactions |
| GET | `/api/escrow/balance` | Live escrow SOL balance |

## Testing with curl

### Create a contract

```bash
curl -X POST http://localhost:5000/api/contracts/create \
  -H "Content-Type: application/json" \
  -d '{
    "student_name": "Alice Johnson",
    "course": "Computer Science BSc",
    "amount_needed": 15000,
    "income_share_pct": 10,
    "repayment_cap": 25000,
    "income_threshold": 25000
  }'
```

### Fund a contract

```bash
curl -X POST http://localhost:5000/api/contracts/fund \
  -H "Content-Type: application/json" \
  -d '{
    "contract_id": "ISA-XXXXXXXX",
    "investor_name": "Bob Smith",
    "amount": 15000,
    "return_pct": 5
  }'
```

### Make a repayment

```bash
curl -X POST http://localhost:5000/api/contracts/repay \
  -H "Content-Type: application/json" \
  -d '{
    "contract_id": "ISA-XXXXXXXX",
    "monthly_income": 3500
  }'
```

### Check escrow balance

```bash
curl http://localhost:5000/api/escrow/balance
```

### View transaction ledger

```bash
curl http://localhost:5000/api/ledger
```

## How It Works

1. **Student creates a contract** — A Solana wallet is generated, 1 SOL airdropped, ISA terms stored in Supabase
2. **Investor funds the contract** — A new wallet is created, 3 SOL airdropped, real SOL transferred to escrow on-chain
3. **Student graduates and earns** — If income exceeds the threshold, a percentage is transferred from escrow back to the student wallet
4. **Every step is verifiable** — Each response includes a Solana Explorer link to the real devnet transaction

## Key Design Decisions

- **Amount scaling**: All GBP amounts are divided by 1000 when converting to SOL (demo purposes on devnet)
- **Real transactions**: Every fund and repayment is a real Solana devnet transaction with a verifiable Explorer link
- **Escrow model**: A single platform escrow wallet holds funds between investors and students
- **Income threshold**: Repayments only trigger when annual income exceeds the contract's threshold (protects low earners)
- **Repayment cap**: Total repayments are capped — the student never pays more than the agreed maximum
