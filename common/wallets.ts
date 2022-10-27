import type { Wallet } from '@project-serum/anchor'
import type { WalletContextState } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'

export const asWallet = (wallet: WalletContextState): Wallet => {
  return {
    signTransaction: wallet.signTransaction!,
    signAllTransactions: wallet.signAllTransactions!,
    publicKey: wallet.publicKey!,
    payer: Keypair.generate(),
  }
}
