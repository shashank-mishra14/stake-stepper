use anchor_lang::prelude::*;
use anchor_lang::solana_program::{system_program, sysvar};

declare_id!("YourProgramIDHere");

#[program]
pub mod stake_stepper {
    use super::*;

    pub fn initialize_challenge(
        ctx: Context<InitializeChallenge>,
        challenge_id: String,
        target_steps: u32,
        duration_days: u32,
        entry_fee: u64
    ) -> Result<()> {
        let challenge = &mut ctx.accounts.challenge;
        challenge.creator = *ctx.accounts.creator.key;
        challenge.challenge_id = challenge_id;
        challenge.target_steps = target_steps;
        challenge.start_time = Clock::get()?.unix_timestamp;
        challenge.end_time = challenge.start_time + (duration_days as i64 * 86400);
        challenge.entry_fee = entry_fee;
        challenge.participants = 0;
        challenge.succeeded = 0;
        Ok(())
    }

    pub fn join_challenge(ctx: Context<JoinChallenge>) -> Result<()> {
        let challenge = &mut ctx.accounts.challenge;
        let participant = &mut ctx.accounts.participant;
        
        // Transfer stake
        **ctx.accounts
            .participant_ata
            .to_account_info()
            .try_borrow_mut_lamports()? -= challenge.entry_fee;
        **ctx.accounts
            .challenge_vault
            .to_account_info()
            .try_borrow_mut_lamports()? += challenge.entry_fee;

        challenge.participants += 1;
        participant.joined_at = Clock::get()?.unix_timestamp;
        
        Ok(())
    }

    pub fn verify_completion(ctx: Context<VerifyCompletion>) -> Result<()> {
        let challenge = &mut ctx.accounts.challenge;
        let participant = &mut ctx.accounts.participant;
        
        require!(
            participant.steps >= challenge.target_steps,
            ChallengeError::InsufficientSteps
        );

        // Calculate reward share
        let reward = challenge.entry_fee * challenge.participants as u64;
        **ctx.accounts
            .challenge_vault
            .to_account_info()
            .try_borrow_mut_lamports()? -= reward;
        **ctx.accounts
            .participant_ata
            .to_account_info()
            .try_borrow_mut_lamports()? += reward;

        challenge.succeeded += 1;
        Ok(())
    }
}

// Account structures and error handling
#[error_code]
pub enum ChallengeError {
    #[msg("Insufficient steps completed")]
    InsufficientSteps,
    #[msg("Challenge period not ended")]
    ChallengeActive,
}

#[derive(Accounts)]
#[instruction(challenge_id: String)]
pub struct InitializeChallenge<'info> {
    #[account(init, payer = creator, space = 8 + Challenge::MAX_SIZE)]
    pub challenge: Account<'info, Challenge>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinChallenge<'info> {
    #[account(mut)]
    pub challenge: Account<'info, Challenge>,
    #[account(mut)]
    pub participant: Signer<'info>,
    // ... other accounts
}

#[account]
pub struct Challenge {
    pub creator: Pubkey,
    pub challenge_id: String,
    pub target_steps: u32,
    pub start_time: i64,
    pub end_time: i64,
    pub entry_fee: u64,
    pub participants: u32,
    pub succeeded: u32,
}

#[account]
pub struct Participant {
    pub user: Pubkey,
    pub challenge: Pubkey,
    pub steps: u32,
    pub joined_at: i64,
}