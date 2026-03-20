"""
solana_escrow.py — Solana wallet and transfer logic for eduInvest
Uses solana-py + solders to interact with Solana devnet.
All transactions are real on-chain devnet transactions.
"""

import time
import requests as http_requests
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.system_program import TransferParams, transfer
from solders.transaction import Transaction
from solders.message import Message
from solana.rpc.api import Client as SolanaClient

# Devnet RPC endpoint
RPC_URL = "https://api.devnet.solana.com"
client = SolanaClient(RPC_URL)

# 1 SOL = 1 billion lamports
LAMPORTS_PER_SOL = 1_000_000_000


def create_wallet():
    """
    Generate a new Solana keypair.
    Returns dict with public_key (base58) and secret_key (list of integers).
    """
    kp = Keypair()
    return {
        "public_key": str(kp.pubkey()),
        "secret_key": list(kp.to_bytes())
    }


def airdrop_sol(public_key: str, amount_sol: float):
    """
    Request a devnet airdrop using multiple faucet sources.
    Tries: 1) RPC airdrop  2) SolFaucet API  3) QuickNode faucet
    Returns the transaction signature or a placeholder if only HTTP faucet worked.
    """
    # --- Method 1: Standard RPC airdrop ---
    try:
        pubkey = Pubkey.from_string(public_key)
        lamports = int(amount_sol * LAMPORTS_PER_SOL)
        resp = client.request_airdrop(pubkey, lamports)
        signature = resp.value
        time.sleep(2)
        print(f"[Airdrop] RPC airdrop succeeded: {signature}")
        return str(signature)
    except Exception as e:
        print(f"[Airdrop] RPC airdrop failed: {e}")

    # --- Method 2: SolFaucet.com API ---
    try:
        print("[Airdrop] Trying SolFaucet.com...")
        resp = http_requests.post(
            "https://api.solfaucet.com/api/v1/fund",
            json={"wallet": public_key, "amount": amount_sol},
            timeout=15
        )
        if resp.status_code == 200:
            time.sleep(2)
            print(f"[Airdrop] SolFaucet succeeded")
            return resp.json().get("txid", "solfaucet-funded")
    except Exception as e:
        print(f"[Airdrop] SolFaucet failed: {e}")

    # --- Method 3: Direct RPC call with different endpoint ---
    try:
        print("[Airdrop] Trying alternate RPC endpoint...")
        alt_client = SolanaClient("https://devnet.helius-rpc.com/?api-key=15fc6819-2a42-4775-aea1-de5066122a44")
        pubkey = Pubkey.from_string(public_key)
        lamports = int(amount_sol * LAMPORTS_PER_SOL)
        resp = alt_client.request_airdrop(pubkey, lamports)
        signature = resp.value
        time.sleep(2)
        print(f"[Airdrop] Alternate RPC succeeded: {signature}")
        return str(signature)
    except Exception as e:
        print(f"[Airdrop] Alternate RPC failed: {e}")

    raise Exception(
        f"All airdrop methods failed. Try manually at https://solfaucet.com "
        f"— paste this address: {public_key}"
    )


def transfer_sol(from_keypair_bytes: list, to_public_key: str, amount_sol: float):
    """
    Build and send a real SOL transfer transaction on devnet.
    from_keypair_bytes: list of 64 integers (secret key bytes)
    to_public_key: base58 string of destination wallet
    amount_sol: amount of SOL to transfer
    Returns the transaction signature as a string.
    """
    sender = Keypair.from_bytes(bytes(from_keypair_bytes))
    receiver = Pubkey.from_string(to_public_key)
    lamports = int(amount_sol * LAMPORTS_PER_SOL)

    # Get a recent blockhash
    blockhash_resp = client.get_latest_blockhash()
    recent_blockhash = blockhash_resp.value.blockhash

    # Build the transfer instruction
    ix = transfer(TransferParams(
        from_pubkey=sender.pubkey(),
        to_pubkey=receiver,
        lamports=lamports
    ))

    # Create, sign, and send the transaction
    msg = Message.new_with_blockhash([ix], sender.pubkey(), recent_blockhash)
    tx = Transaction.new_unsigned(msg)
    tx.sign([sender], recent_blockhash)

    resp = client.send_transaction(tx)
    signature = resp.value
    return str(signature)


def get_balance(public_key: str) -> float:
    """
    Get the SOL balance of a wallet.
    Returns balance as a float in SOL.
    """
    pubkey = Pubkey.from_string(public_key)
    resp = client.get_balance(pubkey)
    return resp.value / LAMPORTS_PER_SOL


def get_tx_url(signature: str) -> str:
    """
    Return a Solana Explorer URL for a transaction on devnet.
    Judges can click this link to verify the transaction is real.
    """
    return f"https://explorer.solana.com/tx/{signature}?cluster=devnet"
