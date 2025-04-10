import React from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        {children}
      </div>
      <footer className="mt-auto py-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            CryptoFans - Exclusive content secured with SEAL encryption on Sui
            blockchain
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Private, secure, and decentralized photo sharing
          </p>
        </div>
      </footer>
    </div>
  );
}
