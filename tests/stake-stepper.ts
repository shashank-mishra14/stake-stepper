import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { StakeStepper } from '../target/types/stake_stepper'

describe('stake-stepper', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  
  const program = anchor.workspace.StakeStepper as Program<StakeStepper>

  it('Initializes Challenge', async () => {
    const challenge = anchor.web3.Keypair.generate()
    await program.methods
      .initializeChallenge("test-01", 5000, 7, new anchor.BN(100000000))
      .accounts({
        challenge: challenge.publicKey,
        creator: provider.wallet.publicKey,
      })
      .signers([challenge])
      .rpc()
    
    const account = await program.account.challenge.fetch(challenge.publicKey)
    assert.equal(account.targetSteps, 5000)
  })
})