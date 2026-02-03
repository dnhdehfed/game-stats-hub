import { useState } from "react";
import {
  Target,
  Trophy,
  Skull,
  Clock,
  ShoppingCart,
  User,
  Swords,
  Crown,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import StatCard from "@/components/shared/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for demonstration
const mockPlayerStats = {
  username: "NinjaFortnite",
  level: 250,
  stats: {
    wins: 1234,
    kills: 45678,
    deaths: 12345,
    kd: 3.7,
    winRate: 15.2,
    matchesPlayed: 8123,
    minutesPlayed: 98765,
    top10: 3456,
    top25: 5678,
  },
};

const mockItemShop = [
  { id: 1, name: "Galaxy Skin", type: "Outfit", rarity: "Legendary", price: 2000 },
  { id: 2, name: "Star Wand", type: "Pickaxe", rarity: "Rare", price: 800 },
  { id: 3, name: "Slurp Juice", type: "Back Bling", rarity: "Epic", price: 1200 },
  { id: 4, name: "Floss", type: "Emote", rarity: "Rare", price: 500 },
  { id: 5, name: "Renegade Raider", type: "Outfit", rarity: "Rare", price: 1200 },
  { id: 6, name: "Mako Glider", type: "Glider", rarity: "Rare", price: 500 },
];

const mockLocker = [
  { id: 1, name: "Skull Trooper", type: "Outfit", rarity: "Epic" },
  { id: 2, name: "Reaper", type: "Pickaxe", rarity: "Epic" },
  { id: 3, name: "Black Knight", type: "Outfit", rarity: "Legendary" },
  { id: 4, name: "The Worm", type: "Emote", rarity: "Rare" },
];

const Fortnite = () => {
  const [searchedPlayer, setSearchedPlayer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchedPlayer(query);
      setIsLoading(false);
    }, 1000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "epic":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "rare":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(200_100%_50%/0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(270_80%_60%/0.15),transparent_50%)]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="font-gaming text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-gradient-fortnite">FORTNITE</span> STATS
              </h1>
              <p className="text-muted-foreground mb-8">
                Search for any player to view their stats, K/D ratio, wins, and more
              </p>

              <div className="flex justify-center">
                <SearchBar
                  placeholder="Enter Fortnite username..."
                  onSearch={handleSearch}
                  variant="fortnite"
                  buttonText="Track Player"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-secondary/50">
                <TabsTrigger value="stats" className="font-gaming text-sm">
                  PLAYER STATS
                </TabsTrigger>
                <TabsTrigger value="shop" className="font-gaming text-sm">
                  ITEM SHOP
                </TabsTrigger>
                <TabsTrigger value="locker" className="font-gaming text-sm">
                  LOCKER
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-8">
                {isLoading ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 border-4 border-fortnite-blue/30 border-t-fortnite-blue rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading stats...</p>
                  </div>
                ) : searchedPlayer ? (
                  <>
                    {/* Player Header */}
                    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-fortnite flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="font-gaming text-2xl">
                            {mockPlayerStats.username}
                          </h2>
                          <p className="text-muted-foreground">
                            Level {mockPlayerStats.level}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                          label="Wins"
                          value={mockPlayerStats.stats.wins.toLocaleString()}
                          icon={Trophy}
                          variant="fortnite"
                        />
                        <StatCard
                          label="K/D Ratio"
                          value={mockPlayerStats.stats.kd}
                          icon={Target}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Total Kills"
                          value={mockPlayerStats.stats.kills.toLocaleString()}
                          icon={Skull}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Win Rate"
                          value={`${mockPlayerStats.stats.winRate}%`}
                          icon={Crown}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Matches Played"
                          value={mockPlayerStats.stats.matchesPlayed.toLocaleString()}
                          icon={Swords}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Top 10"
                          value={mockPlayerStats.stats.top10.toLocaleString()}
                          icon={Trophy}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Top 25"
                          value={mockPlayerStats.stats.top25.toLocaleString()}
                          icon={Trophy}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Time Played"
                          value={`${Math.floor(mockPlayerStats.stats.minutesPlayed / 60)}h`}
                          icon={Clock}
                          variant="fortnite"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-gaming text-xl text-muted-foreground mb-2">
                      NO PLAYER SELECTED
                    </h3>
                    <p className="text-muted-foreground/70">
                      Search for a player above to view their stats
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="shop" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingCart className="w-6 h-6 text-fortnite-blue" />
                    <h2 className="font-gaming text-2xl">TODAY'S ITEM SHOP</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockItemShop.map((item) => (
                      <div
                        key={item.id}
                        className={`glass-card rounded-xl p-4 border ${getRarityColor(item.rarity)} transition-all duration-300 hover:scale-105`}
                      >
                        <div className="aspect-square rounded-lg bg-secondary/50 mb-3 flex items-center justify-center">
                          <ShoppingCart className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                        <h3 className="font-gaming text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.type}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${getRarityColor(item.rarity)}`}
                          >
                            {item.rarity}
                          </span>
                          <span className="font-gaming text-sm text-fortnite-blue">
                            {item.price} V
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="locker" className="space-y-8">
                {searchedPlayer ? (
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="w-6 h-6 text-fortnite-blue" />
                      <h2 className="font-gaming text-2xl">
                        {mockPlayerStats.username}'S LOCKER
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mockLocker.map((item) => (
                        <div
                          key={item.id}
                          className={`glass-card rounded-xl p-4 border ${getRarityColor(item.rarity)} transition-all duration-300 hover:scale-105`}
                        >
                          <div className="aspect-square rounded-lg bg-secondary/50 mb-3 flex items-center justify-center">
                            <User className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                          <h3 className="font-gaming text-sm mb-1">{item.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.type}
                          </p>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${getRarityColor(item.rarity)}`}
                          >
                            {item.rarity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-gaming text-xl text-muted-foreground mb-2">
                      SEARCH FOR A PLAYER
                    </h3>
                    <p className="text-muted-foreground/70">
                      Enter a username to view their locker
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Fortnite;
