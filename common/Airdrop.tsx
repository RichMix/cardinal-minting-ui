import { withFindOrInitAssociatedTokenAccount } from '@cardinal/common'
import {
  CreateMasterEditionV3,
  CreateMetadataV2,
  Creator,
  DataV2,
  MasterEdition,
  Metadata,
} from '@metaplex-foundation/mpl-token-metadata'
import type { Wallet } from '@project-serum/anchor'
import { BN } from '@project-serum/anchor'
import * as splToken from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import type { Connection, PublicKey } from '@solana/web3.js'
import {
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import { notify } from 'common/Notification'
import { asWallet } from 'common/wallets'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import { ButtonSmall } from './ButtonSmall'

export type AirdropMetadata = { name: string; symbol: string; uri: string }

const airdrops = [
  {
    name: 'test',
    symbol: 'test',
    uri: 'https://nft.cardinal.so/metadata/2BaW8Zx16cz7gW46RPjJvu2DXcJzvoruSNSmFQj3BiR5?name=yczEJ6FxCNcrhPmxJuGePznCJ32gKzsj',
  },
]

/**
 * Pay and create mint and token account
 * @param connection
 * @param creator
 * @returns
 */
export const createMintTransaction = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  recipient: PublicKey,
  mintId: PublicKey,
  amount = 1,
  freezeAuthority: PublicKey = recipient,
  receiver = wallet.publicKey
): Promise<[PublicKey, Transaction]> => {
  const mintBalanceNeeded = await splToken.Token.getMinBalanceRentForExemptMint(
    connection
  )
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: mintId,
      lamports: mintBalanceNeeded,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      space: splToken.MintLayout.span,
      programId: splToken.TOKEN_PROGRAM_ID,
    })
  )
  transaction.add(
    splToken.Token.createInitMintInstruction(
      splToken.TOKEN_PROGRAM_ID,
      mintId,
      0,
      wallet.publicKey,
      freezeAuthority
    )
  )
  const receiverAta = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    mintId,
    receiver,
    wallet.publicKey,
    true
  )
  if (amount > 0) {
    transaction.add(
      splToken.Token.createMintToInstruction(
        splToken.TOKEN_PROGRAM_ID,
        mintId,
        receiverAta,
        wallet.publicKey,
        [],
        amount
      )
    )
  }
  return [receiverAta, transaction]
}

export async function airdropNFT(
  connection: Connection,
  wallet: Wallet
): Promise<string> {
  const airdropMetadatas = airdrops
  const randInt = Math.round(Math.random() * (airdropMetadatas.length - 1))
  const metadata: AirdropMetadata | undefined = airdropMetadatas[randInt]
  if (!metadata) throw new Error('No configured airdrops found')

  const mintKeypair = Keypair.generate()
  const transaction = new Transaction()
  await createMintTransaction(
    transaction,
    connection,
    wallet,
    wallet.publicKey,
    mintKeypair.publicKey,
    1
  )
  const masterEditionMetadataId = await Metadata.getPDA(mintKeypair.publicKey)
  const metadataTx = new CreateMetadataV2(
    { feePayer: wallet.publicKey },
    {
      metadata: masterEditionMetadataId,
      metadataData: new DataV2({
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: 0,
        creators: [
          new Creator({
            address: wallet.publicKey.toString(),
            verified: true,
            share: 100,
          }),
        ],
        collection: null,
        uses: null,
      }),
      updateAuthority: wallet.publicKey,
      mint: mintKeypair.publicKey,
      mintAuthority: wallet.publicKey,
    }
  )

  const masterEditionId = await MasterEdition.getPDA(mintKeypair.publicKey)
  const masterEditionTx = new CreateMasterEditionV3(
    {
      feePayer: wallet.publicKey,
      recentBlockhash: (await connection.getRecentBlockhash('max')).blockhash,
    },
    {
      edition: masterEditionId,
      metadata: masterEditionMetadataId,
      updateAuthority: wallet.publicKey,
      mint: mintKeypair.publicKey,
      mintAuthority: wallet.publicKey,
      maxSupply: new BN(0),
    }
  )
  transaction.instructions = [
    ...transaction.instructions,
    ...metadataTx.instructions,
    ...masterEditionTx.instructions,
  ]
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  await wallet.signTransaction(transaction)
  transaction.partialSign(mintKeypair)
  const txid = await sendAndConfirmRawTransaction(
    connection,
    transaction.serialize(),
    {
      commitment: 'confirmed',
    }
  )
  return txid
}

export const Airdrop = () => {
  const { connection } = useEnvironmentCtx()
  const wallet = useWallet()
  return (
    <ButtonSmall
      disabled={!wallet.connected}
      onClick={async () => {
        if (!wallet.connected) return
        try {
          const txid = await airdropNFT(connection, asWallet(wallet))
          notify({ message: 'Airdrop succeeded', txid })
        } catch (e) {
          notify({ message: `Airdrop failed: ${e}`, type: 'error' })
        }
      }}
    >
      Airdrop
    </ButtonSmall>
  )
}

export const AirdropSol = () => {
  const { connection } = useEnvironmentCtx()
  const wallet = useWallet()
  return (
    <ButtonSmall
      disabled={!wallet.connected}
      onClick={async () => {
        if (!wallet.publicKey) return
        try {
          await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL)
          notify({ message: 'Airdropped 1 sol successfully' })
        } catch (e) {
          notify({ message: `Airdrop failed: ${e}`, type: 'error' })
        }
      }}
    >
      Faucet
    </ButtonSmall>
  )
}
