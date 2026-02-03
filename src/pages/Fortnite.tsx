import { useState, useEffect } from "react";
import {
  Target,
  Trophy,
  Skull,
  Clock,
  ShoppingCart,
  User,
  Swords,
  Crown,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import StatCard from "@/components/shared/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fortniteApi, FortnitePlayerStats } from "@/lib/api/fortnite";
import { useToast } from "@/hooks/use-toast";

const Fortnite = () => {
  const [playerData, setPlayerData] = useState<FortnitePlayerStats | null>(null);
  const [shopData, setShopData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShopLoading, setIsShopLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load item shop on mount
  useEffect(() => {
    const loadShop = async () => {
      setIsShopLoading(true);
      const result = await fortniteApi.getItemShop();
      if (result.success && result.data) {
        setShopData(result.data);
      }
      setIsShopLoading(false);
    };
    loadShop();
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setPlayerData(null);

    const result = await fortniteApi.getPlayerStats(query);
    
    if (result.success && result.data) {
      setPlayerData(result.data);
    } else {
      setError(result.error || "Player not found");
      toast({
        title: "Error",
        description: result.error || "Player not found. Make sure the username is correct.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case "legendary":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "epic":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "rare":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "uncommon":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString() || "0";
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
                Search for any player to view their real stats, K/D ratio, wins, and more
              </p>

              <div className="flex justify-center">
                <SearchBar
                  placeholder="Enter Fortnite username (Epic Games)..."
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
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-secondary/50">
                <TabsTrigger value="stats" className="font-gaming text-sm">
                  PLAYER STATS
                </TabsTrigger>
                <TabsTrigger value="shop" className="font-gaming text-sm">
                  ITEM SHOP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-8">
                {isLoading ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 border-4 border-fortnite-blue/30 border-t-fortnite-blue rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading stats...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <h3 className="font-gaming text-xl text-destructive mb-2">
                      PLAYER NOT FOUND
                    </h3>
                    <p className="text-muted-foreground/70">
                      {error}. Make sure stats are set to public.
                    </p>
                  </div>
                ) : playerData ? (
                  <>
                    {/* Player Header */}
                    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-fortnite flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="font-gaming text-2xl">
                            {playerData.account?.name}
                          </h2>
                          <p className="text-muted-foreground">
                            Battle Pass Level {playerData.battlePass?.level || 0}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                          label="Wins"
                          value={formatNumber(playerData.stats?.all?.overall?.wins || 0)}
                          icon={Trophy}
                          variant="fortnite"
                        />
                        <StatCard
                          label="K/D Ratio"
                          value={(playerData.stats?.all?.overall?.kd || 0).toFixed(2)}
                          icon={Target}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Total Kills"
                          value={formatNumber(playerData.stats?.all?.overall?.kills || 0)}
                          icon={Skull}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Win Rate"
                          value={`${(playerData.stats?.all?.overall?.winRate || 0).toFixed(1)}%`}
                          icon={Crown}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Matches Played"
                          value={formatNumber(playerData.stats?.all?.overall?.matches || 0)}
                          icon={Swords}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Top 10"
                          value={formatNumber(playerData.stats?.all?.overall?.top10 || 0)}
                          icon={Trophy}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Top 25"
                          value={formatNumber(playerData.stats?.all?.overall?.top25 || 0)}
                          icon={Trophy}
                          variant="fortnite"
                        />
                        <StatCard
                          label="Time Played"
                          value={`${Math.floor((playerData.stats?.all?.overall?.minutesPlayed || 0) / 60)}h`}
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
                      Search for a player above to view their real stats
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="shop" className="space-y-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingCart className="w-6 h-6 text-fortnite-blue" />
                    <h2 className="font-gaming text-2xl">TODAY'S ITEM SHOP</h2>
                  </div>

                  {isShopLoading ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 border-4 border-fortnite-blue/30 border-t-fortnite-blue rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-muted-foreground">Loading item shop...</p>
                    </div>
                  ) : shopData?.featured?.entries || shopData?.daily?.entries ? (
                    <div className="space-y-8">
                      {/* Featured Items */}
                      {shopData.featured?.entries && (
                        <div>
                          <h3 className="font-gaming text-lg mb-4 text-fortnite-blue">FEATURED</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {shopData.featured.entries.slice(0, 12).map((entry: any) => (
                              <div
                                key={entry.offerId}
                                className={`glass-card rounded-xl p-3 border ${getRarityColor(entry.items?.[0]?.rarity?.value)} transition-all duration-300 hover:scale-105`}
                              >
                                <div className="aspect-square rounded-lg bg-secondary/50 mb-2 overflow-hidden">
                                  {entry.items?.[0]?.images?.icon ? (
                                    <img
                                      src={entry.items[0].images.icon}
                                      alt={entry.items[0].name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <ShoppingCart className="w-8 h-8 text-muted-foreground/30" />
                                    </div>
                                  )}
                                </div>
                                <h4 className="font-medium text-xs mb-1 truncate">
                                  {entry.items?.[0]?.name || "Unknown"}
                                </h4>
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getRarityColor(entry.items?.[0]?.rarity?.value)}`}
                                  >
                                    {entry.items?.[0]?.rarity?.displayValue || "Common"}
                                  </span>
                                  <span className="font-gaming text-xs text-fortnite-blue">
                                    {entry.finalPrice} V
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Daily Items */}
                      {shopData.daily?.entries && (
                        <div>
                          <h3 className="font-gaming text-lg mb-4 text-fortnite-purple">DAILY</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {shopData.daily.entries.slice(0, 12).map((entry: any) => (
                              <div
                                key={entry.offerId}
                                className={`glass-card rounded-xl p-3 border ${getRarityColor(entry.items?.[0]?.rarity?.value)} transition-all duration-300 hover:scale-105`}
                              >
                                <div className="aspect-square rounded-lg bg-secondary/50 mb-2 overflow-hidden">
                                  {entry.items?.[0]?.images?.icon ? (
                                    <img
                                      src={entry.items[0].images.icon}
                                      alt={entry.items[0].name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <ShoppingCart className="w-8 h-8 text-muted-foreground/30" />
                                    </div>
                                  )}
                                </div>
                                <h4 className="font-medium text-xs mb-1 truncate">
                                  {entry.items?.[0]?.name || "Unknown"}
                                </h4>
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getRarityColor(entry.items?.[0]?.rarity?.value)}`}
                                  >
                                    {entry.items?.[0]?.rarity?.displayValue || "Common"}
                                  </span>
                                  <span className="font-gaming text-xs text-fortnite-blue">
                                    {entry.finalPrice} V
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="font-gaming text-xl text-muted-foreground mb-2">
                        SHOP UNAVAILABLE
                      </h3>
                      <p className="text-muted-foreground/70">
                        Unable to load the item shop at this time
                      </p>
                    </div>
                  )}
                </div>
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
