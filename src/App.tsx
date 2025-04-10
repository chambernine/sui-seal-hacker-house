import { motion } from "framer-motion";
import { Globe, Menu, Sparkles, X } from "lucide-react";
import { ThemeToggle } from "./components/theme-toggle";
import { LandingPage } from "./components/LandingPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { CreateAllowlist } from "./components/features/CreateAllowlist";
import { Allowlist } from "./components/features/Allowlist";
import WalrusUpload from "./lib/EncryptAndUpload";
import { AllAllowlist } from "./components/features/OwnedAllowlists";
import Feeds from "./components/features/AllowlistView";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";

// Navigation component with animations and modern styling
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentAccount = useCurrentAccount();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Create Allowlist", path: "/allowlist-example" },
    { name: "My Allowlists", path: "/allowlist-example/admin/allowlists" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg">SUI SEAL</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {currentAccount &&
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path ||
                      (item.path !== "/" &&
                        location.pathname.startsWith(item.path))
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <ConnectButton />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/40"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg">
            {currentAccount &&
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === item.path ||
                      (item.path !== "/" &&
                        location.pathname.startsWith(item.path))
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        {children}
      </div>
      <footer className="mt-auto py-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            Built with SEAL encryption technology on Sui blockchain
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Secure, private, and decentralized
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>("");
  const [capId, setCapId] = useState<string>("");

  return (
    <BrowserRouter>
      <Layout>
        {currentAccount ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/allowlist-example" element={<CreateAllowlist />} />
            <Route
              path="/allowlist-example/admin/allowlist/:id"
              element={
                <div className="space-y-6">
                  <Allowlist
                    setRecipientAllowlist={setRecipientAllowlist}
                    setCapId={setCapId}
                  />
                  <WalrusUpload
                    policyObject={recipientAllowlist}
                    cap_id={capId}
                    moduleName="allowlist"
                  />
                </div>
              }
            />
            <Route
              path="/allowlist-example/admin/allowlists"
              element={<AllAllowlist />}
            />
            <Route
              path="/allowlist-example/view/allowlist/:id"
              element={<Feeds suiAddress={currentAccount.address} />}
            />
          </Routes>
        ) : (
          <WelcomeScreen />
        )}
      </Layout>
    </BrowserRouter>
  );
}

// Enhanced homepage with modern hero section
function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured NFTs</h2>
        <LandingPage />
      </section>
    </div>
  );
}

function HeroSection() {
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

function WelcomeScreen() {
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

export default App;
