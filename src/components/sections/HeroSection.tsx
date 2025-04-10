import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 border border-border/40"
    >
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="relative px-6 py-24 sm:px-12 sm:py-32 lg:px-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <div className="bg-primary/10 p-3 rounded-full inline-block">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl mb-6"
        >
          Secure NFT Platform with{" "}
          <span className="text-primary">SEAL Encryption</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground text-lg max-w-xl mb-8"
        >
          Discover, create, and securely share content with SEAL encryption on
          the Sui blockchain
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/allowlist-example">
            <Button size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Create Allowlist
            </Button>
          </Link>
          <Link to="/allowlist-example/admin/allowlists">
            <Button variant="outline" size="lg">
              View My Allowlists
            </Button>
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
