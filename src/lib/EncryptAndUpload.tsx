import React, { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { getAllowlistedKeyServers, SealClient } from "@mysten/seal";
import { fromHex, toHex } from "@mysten/sui/utils";
import { useNetworkVariable } from "@/config/networkConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  ArrowUpCircle,
  CheckCircle,
  ServerCrash,
  RefreshCcw,
  Server,
} from "lucide-react";
import { motion } from "framer-motion";

export type Data = {
  status: string;
  blobId: string;
  endEpoch: string;
  suiRefType: string;
  suiRef: string;
  suiBaseUrl: string;
  blobUrl: string;
  suiUrl: string;
  isImage: string;
};

interface WalrusUploadProps {
  policyObject: string;
  cap_id: string;
  moduleName: string;
}

type WalrusService = {
  id: string;
  name: string;
  publisherUrl: string;
  aggregatorUrl: string;
};

export function WalrusUpload({
  policyObject,
  cap_id,
  moduleName,
}: WalrusUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<Data | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<string>("service1");
  const [dragActive, setDragActive] = useState<boolean>(false);

  const SUI_VIEW_TX_URL = `https://suiscan.xyz/testnet/tx`;
  const SUI_VIEW_OBJECT_URL = `https://suiscan.xyz/testnet/object`;

  const NUM_EPOCH = 1;
  const packageId = useNetworkVariable("packageId");
  const suiClient = useSuiClient();
  const client = new SealClient({
    suiClient,
    serverObjectIds: getAllowlistedKeyServers("testnet"),
    verifyKeyServers: false,
  });

  const services: WalrusService[] = [
    {
      id: "service1",
      name: "walrus.space",
      publisherUrl: "/publisher1",
      aggregatorUrl: "/aggregator1",
    },
    {
      id: "service2",
      name: "staketab.org",
      publisherUrl: "/publisher2",
      aggregatorUrl: "/aggregator2",
    },
    {
      id: "service3",
      name: "redundex.com",
      publisherUrl: "/publisher3",
      aggregatorUrl: "/aggregator3",
    },
    {
      id: "service4",
      name: "nodes.guru",
      publisherUrl: "/publisher4",
      aggregatorUrl: "/aggregator4",
    },
    {
      id: "service5",
      name: "banansen.dev",
      publisherUrl: "/publisher5",
      aggregatorUrl: "/aggregator5",
    },
    {
      id: "service6",
      name: "everstake.one",
      publisherUrl: "/publisher6",
      aggregatorUrl: "/aggregator6",
    },
  ];

  function getAggregatorUrl(path: string): string {
    const service = services.find((s) => s.id === selectedService);
    const cleanPath = path.replace(/^\/+/, "").replace(/^v1\//, "");
    return `${service?.aggregatorUrl}/v1/${cleanPath}`;
  }

  function getPublisherUrl(path: string): string {
    const service = services.find((s) => s.id === selectedService);
    const cleanPath = path.replace(/^\/+/, "").replace(/^v1\//, "");
    return `${service?.publisherUrl}/v1/${cleanPath}`;
  }

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const selectedFile = event.dataTransfer.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    // Max 10 MiB size
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MiB");
      return;
    }
    // Check if file is an image
    if (!selectedFile.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }
    setFile(selectedFile);
    setInfo(null);
  };

  const handleSubmit = () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 300);

    const reader = new FileReader();
    reader.onload = async function (event) {
      if (event.target && event.target.result) {
        const result = event.target.result;
        if (result instanceof ArrayBuffer) {
          try {
            const nonce = crypto.getRandomValues(new Uint8Array(5));
            const policyObjectBytes = fromHex(policyObject);
            const id = toHex(new Uint8Array([...policyObjectBytes, ...nonce]));

            const { encryptedObject: encryptedBytes } = await client.encrypt({
              threshold: 2,
              packageId,
              id,
              data: new Uint8Array(result),
            });

            const storageInfo = await storeBlob(encryptedBytes);
            clearInterval(progressInterval);
            setUploadProgress(100);

            setTimeout(() => {
              displayUpload(storageInfo.info, file.type);
              setIsUploading(false);
            }, 500);
          } catch (error) {
            console.error("Error during encryption/upload:", error);
            clearInterval(progressInterval);
            setIsUploading(false);
            alert("Error during encryption or upload. Please try again.");
          }
        } else {
          clearInterval(progressInterval);
          setIsUploading(false);
          console.error("Unexpected result type:", typeof result);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const displayUpload = (storage_info: any, media_type: any) => {
    let info;
    if ("alreadyCertified" in storage_info) {
      info = {
        status: "Already certified",
        blobId: storage_info.alreadyCertified.blobId,
        endEpoch: storage_info.alreadyCertified.endEpoch,
        suiRefType: "Previous Sui Certified Event",
        suiRef: storage_info.alreadyCertified.event.txDigest,
        suiBaseUrl: SUI_VIEW_TX_URL,
        blobUrl: getAggregatorUrl(
          `/v1/blobs/${storage_info.alreadyCertified.blobId}`
        ),
        suiUrl: `${SUI_VIEW_OBJECT_URL}/${storage_info.alreadyCertified.event.txDigest}`,
        isImage: media_type.startsWith("image"),
      };
    } else if ("newlyCreated" in storage_info) {
      info = {
        status: "Newly created",
        blobId: storage_info.newlyCreated.blobObject.blobId,
        endEpoch: storage_info.newlyCreated.blobObject.storage.endEpoch,
        suiRefType: "Associated Sui Object",
        suiRef: storage_info.newlyCreated.blobObject.id,
        suiBaseUrl: SUI_VIEW_OBJECT_URL,
        blobUrl: getAggregatorUrl(
          `/v1/blobs/${storage_info.newlyCreated.blobObject.blobId}`
        ),
        suiUrl: `${SUI_VIEW_OBJECT_URL}/${storage_info.newlyCreated.blobObject.id}`,
        isImage: media_type.startsWith("image"),
      };
    } else {
      throw Error("Unhandled successful response!");
    }
    setInfo(info);
  };

  const storeBlob = (encryptedData: Uint8Array) => {
    return fetch(`${getPublisherUrl(`/v1/blobs?epochs=${NUM_EPOCH}`)}`, {
      method: "PUT",
      body: encryptedData,
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((info) => {
          return { info };
        });
      } else {
        alert(
          "Error publishing the blob on Walrus, please select a different Walrus service."
        );
        setIsUploading(false);
        throw new Error("Something went wrong when storing the blob!");
      }
    });
  };

  async function handlePublish(
    wl_id: string,
    cap_id: string,
    moduleName: string
  ) {
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::${moduleName}::publish`,
      arguments: [
        tx.object(wl_id),
        tx.object(cap_id),
        tx.pure.string(info!.blobId),
      ],
    });

    tx.setGasBudget(10000000);
    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async (result) => {
          console.log("res", result);
          alert(
            "Blob attached successfully, now share the link or upload more."
          );
        },
      }
    );
  }

  return (
    <Card className="overflow-hidden border-border/60 bg-background/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Upload Encrypted Content</h2>

        <div className="grid gap-6">
          {/* Walrus service selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium block mb-1">
              Select Walrus service:
            </label>
            <div className="relative rounded-md border border-input">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent py-2 pl-3 pr-10 text-sm focus:ring-2 focus:ring-primary/20 outline-none rounded-md"
                aria-label="Select Walrus service"
              >
                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                    className="bg-background"
                  >
                    {service.name}
                  </option>
                ))}
              </select>
              <Server className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
          </div>

          {/* File upload area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-all ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            } ${file ? "bg-accent/20" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center text-center">
              {file ? (
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="flex items-center gap-1"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" />
                      Change
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Drag & drop your image
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    PNG, JPG or GIF up to 10MB
                  </p>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm">
                      Browse files
                    </Button>
                  </label>
                </>
              )}
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                aria-label="Choose image file to upload"
              />
            </div>
          </div>

          {/* Upload button section */}
          <div className="space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={file === null || isUploading}
              className="w-full flex gap-2 items-center relative overflow-hidden"
            >
              {isUploading ? (
                <>
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-primary/20"
                    style={{ width: `${uploadProgress}%` }}
                  />
                  <span className="relative">Encrypting & Uploading...</span>
                </>
              ) : (
                <>
                  <ArrowUpCircle className="h-4 w-4" />
                  First step: Encrypt and upload to Walrus
                </>
              )}
            </Button>

            {/* Progress indication */}
            {isUploading && (
              <div className="flex items-center justify-center gap-2">
                <div className="relative w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="text-xs font-medium">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            )}
          </div>

          {/* Upload result */}
          {info && file && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4 bg-accent/20"
              role="region"
              aria-label="Upload details"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="text-sm">{info.status}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Content:</span>
                  <a
                    href={info.blobUrl}
                    className="text-sm text-primary underline underline-offset-4"
                    download
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        info.blobUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    aria-label="Download encrypted blob"
                  >
                    View encrypted blob
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sui Object:</span>
                  <a
                    href={info.suiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline underline-offset-4"
                    aria-label="View Sui object details"
                  >
                    View details
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Association button */}
          <Button
            onClick={() => {
              handlePublish(policyObject, cap_id, moduleName);
            }}
            disabled={!info || !file || policyObject === ""}
            variant={
              !info || !file || policyObject === "" ? "outline" : "default"
            }
            className="w-full"
            aria-label="Associate file to Sui object"
          >
            Second step: Associate file to Sui object
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default WalrusUpload;
