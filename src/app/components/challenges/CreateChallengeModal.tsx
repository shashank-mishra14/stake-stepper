'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js"
import { Keypair } from "@solana/web3.js"
import { 
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Form } from "@/app/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define form data type
// interface ChallengeFormData {
//   title: string;
//   description: string;
//   // Add other fields as needed
// }
const CHALLENGE_PROGRAM_ID = new PublicKey("your_program_id_here");
const CHALLENGE_ACCOUNT_SIZE = 1000; // Example size in bytes

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function CreateChallengeModal() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const challengeAccount = Keypair.generate(); // Generate new keypair for the challenge account

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createChallenge = async (data: z.infer<typeof formSchema>) => {
    console.log("Creating challenge with data:", data); // Using the data parameter
    
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }
    
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: challengeAccount.publicKey,
        space: CHALLENGE_ACCOUNT_SIZE,
        lamports: await connection.getMinimumBalanceForRentExemption(
          CHALLENGE_ACCOUNT_SIZE
        ),
        programId: CHALLENGE_PROGRAM_ID,
      })
    )
    
    await sendTransaction(transaction, connection)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Challenge</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createChallenge)} className="space-y-8">
            <div className="space-y-2">
              <label
            htmlFor="title"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
            Title
              </label>
              <input
            type="text"
            id="title"
            placeholder="Enter challenge title"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...form.register("title")}
              />
            </div>
            <div className="space-y-2">
              <label
            htmlFor="description"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
            Description
              </label>
              <textarea
            id="description"
            placeholder="Enter challenge description"
            className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...form.register("description")}
              />
            </div>
            <Button type="submit">Submit</Button>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}