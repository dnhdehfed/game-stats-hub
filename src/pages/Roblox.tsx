import { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  Package,
  Gamepad2,
  Star,
  DollarSign,
  Eye,
  ThumbsUp,
  Search,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import StatCard from "@/components/shared/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { robloxApi, RobloxUser, RobloxGame } from "@/lib/api/roblox";
import { useToast } from "@/hooks/use-toast";

const Roblox = () => {
  const [userData, setUserData] = useState<RobloxUser | null>(null);
  const [gameData, setGameData] = useState<RobloxGame | null>(null);
  const [popularGames, setPopularGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameSearch, setGameSearch] = useState("");
  const { toast } = useToast();

  // Load popular games on mount
  useEffect(() => {
    const loadPopular = async () => {
      setIsPopularLoading(true);
      const result = await robloxApi.getPopularGames();
      if (result.success && result.data) {
        setPopularGames(result.data);
      }
      setIsPopularLoading(false);
    };
    loadPopular();
  }, []);

  const handleUserSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setUserData(null);

    const result = await robloxApi.getUser(query);

    if (result.success && result.data) {
      setUserData(result.data);
    } else {
      setError(result.error || "User not found");
      toast({
        title: "Error",
        description: result.error || "User not found",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleGameSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameSearch.trim()) return;

    setIsLoading(true);
    setError(null);
    setGameData(null);

    const result = await robloxApi.getGame(gameSearch);

    if (result.success && result.data) {
      setGameData(result.data);
    } else {
      setError(result.error || "Game not found");
      toast({
        title: "Error",
        description: result.error || "Game not found",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString() || "0";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0_85%_55%/0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(15_90%_60%/0.15),transparent_50%)]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="font-gaming text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-gradient-roblox">ROBLOX</span> ANALYTICS
              </h1>
              <p className="text-muted-foreground mb-8">
                Track real user RAP, inventory values, game analytics, and discover popular games
              </p>

              <div className="flex justify-center">
                <SearchBar
                  placeholder="Enter Roblox username..."
                  onSearch={handleUserSearch}
                  variant="roblox"
                  buttonText="Find User"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8 bg-secondary/50">
                <TabsTrigger value="user" className="font-gaming text-sm">
                  USER STATS
                </TabsTrigger>
                <TabsTrigger value="games" className="font-gaming text-sm">
                  GAME ANALYTICS
                </TabsTrigger>
                <TabsTrigger value="popular" className="font-gaming text-sm">
                  POPULAR GAMES
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-8">
                {isLoading ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 border-4 border-roblox-red/30 border-t-roblox-red rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading user data...</p>
                  </div>
                ) : error && !userData ? (
                  <div className="text-center py-16">
                    <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                    <h3 className="font-gaming text-xl text-destructive mb-2">
                      USER NOT FOUND
                    </h3>
                    <p className="text-muted-foreground/70">{error}</p>
                  </div>
                ) : userData ? (
                  <>
                    {/* User Header */}
                    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-roblox flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="font-gaming text-2xl">{userData.displayName}</h2>
                          <p className="text-muted-foreground">
                            @{userData.username} • Joined {formatDate(userData.created)}
                          </p>
                        </div>
                      </div>

                      {userData.description && (
                        <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
                          {userData.description.slice(0, 200)}
                          {userData.description.length > 200 ? "..." : ""}
                        </p>
                      )}

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <StatCard
                          label="RAP"
                          value={`R$${formatNumber(userData.rap)}`}
                          icon={DollarSign}
                          variant="roblox"
                        />
                        <StatCard
                          label="Followers"
                          value={formatNumber(userData.followers)}
                          icon={Users}
                          variant="roblox"
                        />
                        <StatCard
                          label="Following"
                          value={formatNumber(userData.following)}
                          icon={Users}
                          variant="roblox"
                        />
                        <StatCard
                          label="Friends"
                          value={formatNumber(userData.friends)}
                          icon={Users}
                          variant="roblox"
                        />
                      </div>

                      {/* Inventory */}
                      {userData.inventory && userData.inventory.length > 0 && (
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <Package className="w-5 h-5 text-roblox-red" />
                            <h3 className="font-gaming text-lg">COLLECTIBLES</h3>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {userData.inventory.map((item: any) => (
                              <div
                                key={item.userAssetId || item.assetId}
                                className="glass-card rounded-xl p-3 border border-roblox-red/20 transition-all duration-300 hover:scale-105 hover:border-roblox-red/40"
                              >
                                <div className="aspect-square rounded-lg bg-secondary/50 mb-2 flex items-center justify-center">
                                  <Package className="w-8 h-8 text-muted-foreground/30" />
                                </div>
                                <h4 className="font-medium text-xs mb-1 truncate">
                                  {item.name}
                                </h4>
                                <p className="text-[10px] text-roblox-red font-medium">
                                  RAP: R${formatNumber(item.recentAveragePrice || 0)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-gaming text-xl text-muted-foreground mb-2">
                      NO USER SELECTED
                    </h3>
                    <p className="text-muted-foreground/70">
                      Search for a user above to view their real stats and inventory
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="games" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <form
                    onSubmit={handleGameSearch}
                    className="flex gap-3 max-w-xl mx-auto mb-8"
                  >
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search for a game..."
                        value={gameSearch}
                        onChange={(e) => setGameSearch(e.target.value)}
                        variant="roblox"
                        className="pl-10 h-12"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-roblox text-white font-gaming uppercase tracking-wider px-6 rounded-lg hover:shadow-lg glow-roblox hover:scale-105 transition-all duration-300"
                    >
                      Search
                    </button>
                  </form>

                  {isLoading ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 border-4 border-roblox-red/30 border-t-roblox-red rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-muted-foreground">Loading game data...</p>
                    </div>
                  ) : gameData ? (
                    <div className="glass-card rounded-2xl p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-xl bg-gradient-roblox flex items-center justify-center">
                          <Gamepad2 className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h2 className="font-gaming text-2xl">{gameData.name}</h2>
                          <p className="text-muted-foreground">
                            by {gameData.creator?.name || "Unknown"} • Created{" "}
                            {formatDate(gameData.created)}
                          </p>
                        </div>
                      </div>

                      {gameData.description && (
                        <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
                          {gameData.description.slice(0, 300)}
                          {gameData.description.length > 300 ? "..." : ""}
                        </p>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                          label="Visits"
                          value={formatNumber(gameData.visits)}
                          icon={Eye}
                          variant="roblox"
                        />
                        <StatCard
                          label="Playing Now"
                          value={formatNumber(gameData.playing)}
                          icon={Users}
                          variant="roblox"
                        />
                        <StatCard
                          label="Favorites"
                          value={formatNumber(gameData.favoritedCount)}
                          icon={Star}
                          variant="roblox"
                        />
                        <StatCard
                          label="Max Players"
                          value={gameData.maxPlayers}
                          icon={Users}
                          variant="roblox"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Gamepad2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="font-gaming text-xl text-muted-foreground mb-2">
                        SEARCH FOR A GAME
                      </h3>
                      <p className="text-muted-foreground/70">
                        Enter a game name to view its real analytics
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-roblox-red" />
                    <h2 className="font-gaming text-2xl">TRENDING GAMES</h2>
                  </div>

                  {isPopularLoading ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 border-4 border-roblox-red/30 border-t-roblox-red rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-muted-foreground">Loading popular games...</p>
                    </div>
                  ) : popularGames.length > 0 ? (
                    <div className="grid gap-4">
                      {popularGames.map((game: any, index: number) => (
                        <div
                          key={game.universeId || game.placeId || index}
                          className="glass-card rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:border-roblox-red/30 border border-transparent"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-roblox flex items-center justify-center font-gaming text-white">
                            {index + 1}
                          </div>

                          <div className="w-16 h-16 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {game.imageToken ? (
                              <img
                                src={`https://thumbnails.roblox.com/v1/games/icons?universeIds=${game.universeId}&size=150x150&format=Png`}
                                alt={game.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <Gamepad2 className="w-8 h-8 text-muted-foreground/30" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-gaming text-lg truncate">{game.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {game.gameDescription?.slice(0, 50) || ""}
                            </p>
                          </div>

                          <div className="hidden md:flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <p className="text-muted-foreground text-xs">Playing</p>
                              <p className="font-gaming text-neon-green">
                                {formatNumber(game.playerCount || 0)}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-muted-foreground text-xs">Visits</p>
                              <p className="font-gaming text-roblox-red">
                                {formatNumber(game.totalUpVotes || 0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Gamepad2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="font-gaming text-xl text-muted-foreground mb-2">
                        NO GAMES FOUND
                      </h3>
                      <p className="text-muted-foreground/70">
                        Unable to load popular games at this time
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

export default Roblox;
