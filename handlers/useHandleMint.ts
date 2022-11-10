import { findAta } from '@cardinal/common'
import {
  CandyMachine,
  createMintNftInstruction,
  findLockupSettingsId,
  findPermissionedSettingsId,
  PROGRAM_ID,
  remainingAccountsForLockup,
  remainingAccountsForPermissioned,
  WhitelistMintMode,
} from '@cardinal/mpl-candy-machine-utils'
import {
  getFeatureAccountAddress,
  getGatewayTokenAddressForOwnerAndGatekeeperNetwork,
  NetworkFeature,
  PROGRAM_ID as GATEKEEPER_PROGRAM,
  UserTokenExpiry,
} from '@identity.com/solana-gateway-ts'
import {
  Edition,
  Metadata,
  MetadataProgram,
} from '@metaplex-foundation/mpl-token-metadata'
import { useWallet } from '@solana/wallet-adapter-react'
import type { AccountMeta } from '@solana/web3.js'
import {
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  sendAndConfirmRawTransaction,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
  Transaction,
} from '@solana/web3.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notify } from 'common/Notification'
import { asWallet } from 'common/wallets'
import { CANDY_MACHINE_DATA_KEY } from 'hooks/useCandyMachineData'
import { useCandyMachineId } from 'hooks/useCandyMachineId'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

export const useHandleMint = () => {
  const { connection, environment } = useEnvironmentCtx()
  const wallet = asWallet(useWallet())
  const queryClient = useQueryClient()
  const candyMachineId = useCandyMachineId()
  return useMutation(
    ['useHandleMint'],
    async (): Promise<string> => {
      if (!candyMachineId) throw 'No candy machine id found'
      if (!wallet.publicKey) throw 'Wallet not connected'
      const nftToMintKeypair = Keypair.generate()
      const payerId = wallet.publicKey
      const tokenAccountToReceive = await findAta(
        nftToMintKeypair.publicKey,
        wallet.publicKey,
        false
      )

      const metadataId = await Metadata.getPDA(nftToMintKeypair.publicKey)
      const masterEditionId = await Edition.getPDA(nftToMintKeypair.publicKey)
      const [candyMachineCreatorId, candyMachineCreatorIdBump] =
        await PublicKey.findProgramAddress(
          [Buffer.from('candy_machine'), candyMachineId.toBuffer()],
          PROGRAM_ID
        )

      const candyMachine = await CandyMachine.fromAccountAddress(
        connection,
        candyMachineId
      )
      console.log(`> Creating mint instruction`)
      const mintIx = createMintNftInstruction(
        {
          candyMachine: candyMachineId,
          candyMachineCreator: candyMachineCreatorId,
          payer: payerId,
          wallet: candyMachine.wallet,
          metadata: metadataId,
          mint: nftToMintKeypair.publicKey,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
          masterEdition: masterEditionId,
          tokenMetadataProgram: MetadataProgram.PUBKEY,
          clock: SYSVAR_CLOCK_PUBKEY,
          recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY,
        },
        {
          creatorBump: candyMachineCreatorIdBump,
        }
      )
      const remainingAccounts: AccountMeta[] = []

      // Gatekeeper
      if (candyMachine.data.gatekeeper) {
        console.log(`> Add gatekeeper accounts`)
        const gatewayTokenKey =
          getGatewayTokenAddressForOwnerAndGatekeeperNetwork(
            wallet.publicKey,
            candyMachine.data.gatekeeper.gatekeeperNetwork
          )
        console.log(gatewayTokenKey.toString())
        remainingAccounts.push({
          pubkey: gatewayTokenKey,
          isWritable: true,
          isSigner: false,
        })

        if (candyMachine.data.gatekeeper.expireOnUse) {
          console.log(`> Add gatekeeper expiration accounts`)
          remainingAccounts.push({
            pubkey: GATEKEEPER_PROGRAM,
            isWritable: false,
            isSigner: false,
          })
          const featureAddress = getFeatureAccountAddress(
            new NetworkFeature({
              userTokenExpiry: new UserTokenExpiry({}),
            }),
            candyMachine.data.gatekeeper.gatekeeperNetwork
          )
          remainingAccounts.push({
            pubkey: featureAddress,
            isWritable: false,
            isSigner: false,
          })
        }
      }

      // whitelist token
      if (candyMachine.data.whitelistMintSettings) {
        const mint = new PublicKey(candyMachine.data.whitelistMintSettings.mint)
        const whitelistToken = await findAta(mint, wallet.publicKey)
        remainingAccounts.push({
          pubkey: whitelistToken,
          isWritable: true,
          isSigner: false,
        })
        if (
          candyMachine.data.whitelistMintSettings.mode ===
          WhitelistMintMode.BurnEveryTime
        ) {
          remainingAccounts.push({
            pubkey: mint,
            isWritable: true,
            isSigner: false,
          })
          remainingAccounts.push({
            pubkey: wallet.publicKey,
            isWritable: false,
            isSigner: true,
          })
        }
      }

      // Payment
      if (candyMachine.tokenMint) {
        console.log(`> Add payment accounts`)
        const payerTokenAccount = await findAta(
          candyMachine.tokenMint,
          payerId,
          true
        )
        remainingAccounts.push(
          {
            pubkey: payerTokenAccount,
            isWritable: true,
            isSigner: false,
          },
          {
            pubkey: payerId,
            isWritable: true,
            isSigner: false,
          }
        )
      }

      // Inline minting
      console.log(`> Adding mint accounts`)
      remainingAccounts.push({
        pubkey: tokenAccountToReceive,
        isSigner: false,
        isWritable: true,
      })

      // Lockup settings
      const [lockupSettingsId] = await findLockupSettingsId(candyMachineId)
      const lockupSettings = await connection.getAccountInfo(lockupSettingsId)
      if (lockupSettings) {
        console.log(`> Adding lockup settings accounts`)
        remainingAccounts.push(
          ...(await remainingAccountsForLockup(
            candyMachineId,
            nftToMintKeypair.publicKey,
            tokenAccountToReceive
          ))
        )
      }

      // Permissioned settings
      const [permissionedSettingsId] = await findPermissionedSettingsId(
        candyMachineId
      )
      const permissionedSettings = await connection.getAccountInfo(
        permissionedSettingsId
      )
      if (permissionedSettings) {
        console.log(`> Adding permissioned settings accounts`)
        remainingAccounts.push(
          ...(await remainingAccountsForPermissioned(
            candyMachineId,
            nftToMintKeypair.publicKey,
            tokenAccountToReceive
          ))
        )
      }

      const instructions = [
        ComputeBudgetProgram.requestUnits({
          units: 400000,
          additionalFee: 0,
        }),
        {
          ...mintIx,
          keys: [
            ...mintIx.keys.map((k) =>
              k.pubkey.equals(nftToMintKeypair.publicKey)
                ? { ...k, isSigner: true }
                : k
            ),
            // remaining accounts for locking
            ...remainingAccounts,
          ],
        },
      ]
      let tx = new Transaction()
      tx.instructions = instructions
      tx.feePayer = payerId
      tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
      tx = await wallet.signTransaction(tx)
      await tx.partialSign(nftToMintKeypair)
      const txid = await sendAndConfirmRawTransaction(
        connection,
        tx.serialize()
      )
      console.log(
        `mint [${nftToMintKeypair.publicKey.toString()}] candy machine [${candyMachineId.toString()}] https://explorer.solana.com/tx/${txid}?cluster=${
          environment.label
        }`
      )
      return txid
    },
    {
      onError: (e: any) => {
        console.log(e, 'logs' in e ? e.logs : [])
        notify({
          message: `Something went wrong with buying the token`,
          description: `Please check your balance and try again`,
          type: 'error',
        })
      },
      onSuccess: (txid) => {
        notify({
          message: `Succesfully minted 1 token`,
          txid,
          type: 'error',
        })
        queryClient.resetQueries([CANDY_MACHINE_DATA_KEY])
      },
    }
  )
}
