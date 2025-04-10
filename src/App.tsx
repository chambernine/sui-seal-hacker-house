import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { CreateAllowlist } from "./components/features/CreateAllowlist";
import { Allowlist } from "./components/features/Allowlist";
import WalrusUpload from "./lib/EncryptAndUpload";
import { AllAllowlist } from "./components/features/OwnedAllowlists";
import Feeds from "./components/features/AllowlistView";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./components/pages/HomePage";
import { WelcomeScreen } from "./components/pages/WelcomeScreen";
import "@mysten/dapp-kit/dist/index.css";

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

export default App;
