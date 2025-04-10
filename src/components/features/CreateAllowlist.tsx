import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";
import { useNetworkVariable } from "../../config/networkConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, PlusCircle, Users } from "lucide-react";

export function CreateAllowlist() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const packageId = useNetworkVariable("packageId");
  const suiClient = useSuiClient();

  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  function createAllowlist(name: string) {
    if (name.trim() === "") {
      alert("Please enter a name for your membership tier");
      return;
    }

    setIsCreating(true);
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::allowlist::create_allowlist_entry`,
      arguments: [tx.pure.string(name)],
    });
    tx.setGasBudget(10000000);

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async (result) => {
          console.log("res", result);
          // Extract the created allowlist object ID from the transaction result
          const allowlistObject = result.effects?.created?.find(
            (item) =>
              item.owner &&
              typeof item.owner === "object" &&
              "Shared" in item.owner
          );
          const createdObjectId = allowlistObject?.reference?.objectId;
          setIsCreating(false);
          if (createdObjectId) {
            window.open(
              `${window.location.origin}/allowlist-example/admin/allowlist/${createdObjectId}`,
              "_blank"
            );
          }
        },
        onError: () => {
          setIsCreating(false);
        },
      }
    );
  }

  const handleViewAll = () => {
    navigate(`/allowlist-example/admin/allowlists`);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Membership Tier
          </h1>
          <p className="text-muted-foreground">
            Create exclusive content tiers for your subscribers
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Create New Membership Tier Card */}
        <Card className="overflow-hidden bg-background/50 backdrop-blur-sm border-border/60">
          <CardHeader className="pb-3">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-2">
              <PlusCircle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Create New Membership Tier</CardTitle>
            <CardDescription>
              Create a new subscription tier to manage exclusive content access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="allowlist-name" className="text-sm font-medium">
                  Membership Name
                </label>
                <div className="relative">
                  <input
                    id="allowlist-name"
                    className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/20"
                    placeholder="Enter a name for your membership tier"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FileText className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <p className="text-xs text-muted-foreground">
                  For example: "Premium", "VIP", or "Exclusive Access"
                </p>
              </div>

              <Button
                className="w-full"
                onClick={() => createAllowlist(name)}
                disabled={name.trim() === "" || isCreating}
              >
                {isCreating ? "Creating..." : "Create Membership Tier"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View Existing Memberships Card */}
        <Card className="overflow-hidden bg-background/50 backdrop-blur-sm border-border/60">
          <CardHeader className="pb-3">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Manage Your Content</CardTitle>
            <CardDescription>
              Control access to your exclusive content and manage subscribers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                View and manage all your membership tiers. Add or remove
                subscribers, upload exclusive photos, and configure access
                settings.
              </p>
              <Button
                variant="outline"
                className="w-full border-primary/20 hover:border-primary/40"
                onClick={handleViewAll}
              >
                View All Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Guide */}
      <Card className="overflow-hidden bg-background/50 backdrop-blur-sm border-border/60">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">
            Quick Guide to Creating Content Memberships
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="font-medium">1</span>
              </div>
              <h4 className="font-medium">Create a Membership Tier</h4>
              <p className="text-sm text-muted-foreground">
                Set up a named tier to organize your exclusive content for
                subscribers.
              </p>
            </div>
            <div className="space-y-2">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="font-medium">2</span>
              </div>
              <h4 className="font-medium">Add Subscribers</h4>
              <p className="text-sm text-muted-foreground">
                Add wallet addresses of subscribers who should have access to
                your content.
              </p>
            </div>
            <div className="space-y-2">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="font-medium">3</span>
              </div>
              <h4 className="font-medium">Upload Private Photos</h4>
              <p className="text-sm text-muted-foreground">
                Upload and encrypt your exclusive photos, which will only be
                viewable by your subscribers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
