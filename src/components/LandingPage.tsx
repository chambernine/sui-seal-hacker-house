import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface NFT {
  id: number;
  title: string;
  price: string;
  image: string;
  artist: string;
  likes: number;
  category?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const nfts: NFT[] = [
  {
    id: 1,
    title: "Cosmic Dreamer #1",
    price: "2.5 SUI",
    image:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
    artist: "CryptoArtist",
    likes: 234,
    category: "Abstract",
  },
  {
    id: 2,
    title: "Digital Paradise #7",
    price: "1.8 SUI",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    artist: "PixelMaster",
    likes: 189,
    category: "Digital Art",
  },
  {
    id: 3,
    title: "Abstract Minds #3",
    price: "3.2 SUI",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    artist: "Web3Creator",
    likes: 456,
    category: "Generative",
  },
  {
    id: 4,
    title: "Future Visions #5",
    price: "1.5 SUI",
    image:
      "https://images.unsplash.com/photo-1633101585272-9512182e107b?w=800&auto=format&fit=crop&q=60",
    artist: "NFTGenius",
    likes: 321,
    category: "Photography",
  },
  {
    id: 5,
    title: "Neon Dreams",
    price: "2.7 SUI",
    image:
      "https://images.unsplash.com/photo-1647163927406-56e868e8bb80?w=800&auto=format&fit=crop&q=60",
    artist: "DigitalWizard",
    likes: 278,
    category: "Illustration",
  },
  {
    id: 6,
    title: "Quantum Fragment",
    price: "4.2 SUI",
    image:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&auto=format&fit=crop&q=60",
    artist: "CryptoGenius",
    likes: 512,
    category: "3D Art",
  },
  {
    id: 7,
    title: "Ethereal Space",
    price: "1.9 SUI",
    image:
      "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&auto=format&fit=crop&q=60",
    artist: "SuiArtist",
    likes: 189,
    category: "Digital Art",
  },
  {
    id: 8,
    title: "Blockchain Visions",
    price: "3.5 SUI",
    image:
      "https://images.unsplash.com/photo-1633186726100-3e86214e00e3?w=800&auto=format&fit=crop&q=60",
    artist: "CryptoDesigner",
    likes: 345,
    category: "Abstract",
  },
];

export function LandingPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          "All",
          "Abstract",
          "Digital Art",
          "Generative",
          "Photography",
          "3D Art",
          "Illustration",
        ].map((category) => (
          <Button
            key={category}
            variant={category === "All" ? "secondary" : "outline"}
            size="sm"
            className={cn(
              "rounded-full",
              category === "All" &&
                "bg-primary/20 hover:bg-primary/30 text-primary dark:bg-primary/10"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {nfts.map((nft) => (
          <motion.div
            key={nft.id}
            variants={item}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full bg-background/50 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all duration-300">
              <div className="relative aspect-square">
                {/* NFT image with gradient overlay at the bottom */}
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Category badge */}
                <Badge
                  variant="secondary"
                  className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
                >
                  {nft.category}
                </Badge>

                {/* Action buttons */}
                <div className="absolute top-3 right-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full size-8 bg-background/80 backdrop-blur-sm border-border/60"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold truncate">{nft.title}</h3>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {nft.price}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate">
                    {nft.artist}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-3.5 w-3.5" />
                    <span>{nft.likes}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
