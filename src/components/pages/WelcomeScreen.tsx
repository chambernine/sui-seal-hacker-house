import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ConnectButton } from "@mysten/dapp-kit";

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto"
      >
        <div className="bg-primary/10 p-4 rounded-full inline-block mb-6">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
          Welcome to SUI SEAL NFT Platform
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Please connect your wallet to continue exploring the decentralized
          world of NFTs with SEAL encryption.
        </p>
        <div className="inline-block p-1.5 bg-background/50 backdrop-blur-sm rounded-lg border border-border/60">
          <ConnectButton />
        </div>
      </motion.div>
    </div>
  );
}
