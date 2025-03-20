use anchor_lang::prelude::*;

declare_id!("7QiuYs8TGZ3hQBe6GL2KWrpqnRuhoNa2naW7CQUqGTAo");

#[program]
pub mod stake_stepper {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
