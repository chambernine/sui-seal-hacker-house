import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl glass"
    >
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="relative px-6 py-24 sm:px-12 sm:py-32 lg:px-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-chart-1 to-primary p-4 rounded-full inline-block premium-glow">
            <Lock className="h-10 w-10 text-white" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl mb-8"
        >
          <span className="gradient-text">Premium Content</span> for
          <span className="gradient-text"> Your Subscribers</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground text-xl max-w-2xl mb-10"
        >
          Create and monetize exclusive photo content with blockchain-powered
          privacy. Give your fans the premium experience they deserve.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Link to="/allowlist-example">
            <Button variant="premium" size="lg" className="gap-2">
              <Star className="h-5 w-5" />
              Create Content
            </Button>
          </Link>
          <Link to="/allowlist-example/admin/allowlists">
            <Button variant="outline" size="lg" className="gap-2">
              Manage Your Content
            </Button>
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
