import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MoreHorizontal, Lock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Creator {
  id: number;
  name: string;
  price: string;
  profileImage: string;
  bio: string;
  subscribers: number;
  contentType?: string;
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

const creators: Creator[] = [
  {
    id: 1,
    name: "CryptoArtist",
    price: "2.5 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
    bio: "Digital artist sharing exclusive photography collections",
    subscribers: 234,
    contentType: "Photography",
  },
  {
    id: 2,
    name: "PixelMaster",
    price: "1.8 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    bio: "Creating unique AI-generated art and photo collections",
    subscribers: 189,
    contentType: "Digital Art",
  },
  {
    id: 3,
    name: "AbstractMinds",
    price: "3.2 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    bio: "Experimental photography and artistic collections",
    subscribers: 456,
    contentType: "Mixed Media",
  },
  {
    id: 4,
    name: "FutureVisions",
    price: "1.5 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1633101585272-9512182e107b?w=800&auto=format&fit=crop&q=60",
    bio: "Sci-fi and futuristic themed photo albums",
    subscribers: 321,
    contentType: "Photography",
  },
  {
    id: 5,
    name: "NeonDreams",
    price: "2.7 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1647163927406-56e868e8bb80?w=800&auto=format&fit=crop&q=60",
    bio: "Urban photography with neon aesthetics",
    subscribers: 278,
    contentType: "Photography",
  },
  {
    id: 6,
    name: "QuantumFragments",
    price: "4.2 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&auto=format&fit=crop&q=60",
    bio: "Abstract art and experimental photography",
    subscribers: 512,
    contentType: "Mixed Media",
  },
  {
    id: 7,
    name: "EtherealSpaces",
    price: "1.9 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&auto=format&fit=crop&q=60",
    bio: "Nature and landscape photography collections",
    subscribers: 189,
    contentType: "Photography",
  },
  {
    id: 8,
    name: "BlockchainVisions",
    price: "3.5 SUI ",
    profileImage:
      "https://images.unsplash.com/photo-1633186726100-3e86214e00e3?w=800&auto=format&fit=crop&q=60",
    bio: "Crypto-themed art and photography",
    subscribers: 345,
    contentType: "Digital Art",
  },
];

export function LandingPage() {
  return (
    <div className="space-y-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {creators.map((creator) => (
          <motion.div
            key={creator.id}
            variants={item}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full bg-background/50 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all duration-300">
              <div className="relative aspect-square">
                {/* Creator profile image with gradient overlay at the bottom */}
                <img
                  src={creator.profileImage}
                  alt={creator.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Content type badge */}
                <Badge
                  variant="secondary"
                  className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
                >
                  {creator.contentType}
                </Badge>

                {/* Locked content icon */}
                <div className="absolute bottom-3 right-3">
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm flex gap-1 items-center"
                  >
                    <Lock className="h-3 w-3" />
                    Exclusive Content
                  </Badge>
                </div>

                {/* Creator name on image */}
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-bold text-white text-lg">
                    {creator.name}
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground truncate">
                    {creator.bio}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {creator.price}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{creator.subscribers} subscribers</span>
                  </div>
                </div>

                <div className="mt-2">
                  <Button className="w-full" size="sm">
                    Subscribe
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
