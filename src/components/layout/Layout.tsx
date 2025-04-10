import React from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-mesh">
      <div className="absolute inset-0 bg-grid-white/5 pointer-events-none"></div>
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 relative z-10">
        {children}
      </div>
      <footer className="mt-auto py-8 border-t border-border/40 bg-background/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-medium mb-2">
            <span className="gradient-text">CryptoFans</span> - Premium
            Exclusive Content
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Private, secure, and decentralized exclusive content platform
            powered by Sui blockchain
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Support
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
