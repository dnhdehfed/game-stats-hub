import { useState } from "react";
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
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import StatCard from "@/components/shared/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Mock data
const mockUserStats = {
  username: "builderman",
  displayName: "Builderman",
  rap: 125000,
  value: 150000,
  friends: 9999,
  followers: 1500000,
  following: 50,
  accountAge: "18 years",
};

const mockInventory = [
  { id: 1, name: "Dominus Empyreus", type: "Hat", rap: 50000, value: 75000 },
  { id: 2, name: "Valkyrie Helm", type: "Hat", rap: 25000, value: 30000 },
  { id: 3, name: "Clockwork's Shades", type: "Face", rap: 15000, value: 18000 },
  { id: 4, name: "Sparkle Time Fedora", type: "Hat", rap: 8000, value: 10000 },
];

const mockPopularGames = [
  {
    id: 1,
    name: "Adopt Me!",
    visits: "32.5B",
    playing: "425K",
    likes: "15.2M",
    genre: "Roleplay",
  },
  {
    id: 2,
    name: "Brookhaven",
    visits: "28.1B",
    playing: "380K",
    likes: "12.8M",
    genre: "Town & City",
  },
  {
    id: 3,
    name: "Tower of Hell",
    visits: "22.7B",
    playing: "195K",
    likes: "8.5M",
    genre: "Obby",
  },
  {
    id: 4,
    name: "Murder Mystery 2",
    visits: "5.8B",
    playing: "85K",
    likes: "4.2M",
    genre: "Horror",
  },
  {
    id: 5,
    name: "Blox Fruits",
    visits: "42.3B",
    playing: "520K",
    likes: "18.1M",
    genre: "Adventure",
  },
  {
    id: 6,
    name: "Pet Simulator X",
    visits: "12.4B",
    playing: "145K",
    likes: "6.3M",
    genre: "Simulator",
  },
];

const mockGameStats = {
  name: "Sample Game",
  visits: "1.2B",
  playing: "15.4K",
  favorites: "2.1M",
  likes: "890K",
  dislikes: "45K",
  created: "Jan 1, 2020",
  updated: "Feb 1, 2025",
};

const Roblox = () => {
  const [searchedUser, setSearchedUser] = useState<string | null>(null);
  const [searchedGame, setSearchedGame] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gameSearch, setGameSearch] = useState("");

  const handleUserSearch = (query: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchedUser(query);
      setIsLoading(false);
    }, 1000);
  };

  const handleGameSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameSearch.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setSearchedGame(gameSearch);
        setIsLoading(false);
      }, 1000);
    }
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
                Track user RAP, inventory values, game analytics, and discover popular games
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
                ) : searchedUser ? (
                  <>
                    {/* User Header */}
                    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-roblox flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="font-gaming text-2xl">
                            {mockUserStats.displayName}
                          </h2>
                          <p className="text-muted-foreground">
                            @{mockUserStats.username} • {mockUserStats.accountAge}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <StatCard
                          label="RAP"
                          value={`R$${mockUserStats.rap.toLocaleString()}`}
                          icon={DollarSign}
                          variant="roblox"
                        />
                        <StatCard
                          label="Value"
                          value={`R$${mockUserStats.value.toLocaleString()}`}
                          icon={TrendingUp}
                          variant="roblox"
                        />
                        <StatCard
                          label="Followers"
                          value={mockUserStats.followers.toLocaleString()}
                          icon={Users}
                          variant="roblox"
                        />
                        <StatCard
                          label="Friends"
                          value={mockUserStats.friends.toLocaleString()}
                          icon={Users}
                          variant="roblox"
                        />
                      </div>

                      {/* Inventory */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Package className="w-5 h-5 text-roblox-red" />
                          <h3 className="font-gaming text-lg">INVENTORY</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {mockInventory.map((item) => (
                            <div
                              key={item.id}
                              className="glass-card rounded-xl p-4 border border-roblox-red/20 transition-all duration-300 hover:scale-105 hover:border-roblox-red/40"
                            >
                              <div className="aspect-square rounded-lg bg-secondary/50 mb-3 flex items-center justify-center">
                                <Package className="w-10 h-10 text-muted-foreground/30" />
                              </div>
                              <h4 className="font-medium text-sm mb-1 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                {item.type}
                              </p>
                              <div className="space-y-1">
                                <p className="text-xs">
                                  <span className="text-muted-foreground">RAP: </span>
                                  <span className="text-roblox-red font-medium">
                                    R${item.rap.toLocaleString()}
                                  </span>
                                </p>
                                <p className="text-xs">
                                  <span className="text-muted-foreground">Value: </span>
                                  <span className="text-roblox-coral font-medium">
                                    R${item.value.toLocaleString()}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-gaming text-xl text-muted-foreground mb-2">
                      NO USER SELECTED
                    </h3>
                    <p className="text-muted-foreground/70">
                      Search for a user above to view their stats and inventory
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

                  {searchedGame ? (
                    <div className="glass-card rounded-2xl p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-xl bg-gradient-roblox flex items-center justify-center">
                          <Gamepad2 className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h2 className="font-gaming text-2xl">{searchedGame}</h2>
                          <p className="text-muted-foreground">
                            Created {mockGameStats.created} • Updated{" "}
                            {mockGameStats.updated}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                          label="Visits"
                          value={mockGameStats.visits}
                          icon={Eye}
                          variant="roblox"
                        />
                        <StatCard
                          label="Playing Now"
                          value={mockGameStats.playing}
                          icon={Users}
                          variant="roblox"
                        />
                        <StatCard
                          label="Favorites"
                          value={mockGameStats.favorites}
                          icon={Star}
                          variant="roblox"
                        />
                        <StatCard
                          label="Likes"
                          value={mockGameStats.likes}
                          icon={ThumbsUp}
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
                        Enter a game name to view its analytics
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

                  <div className="grid gap-4">
                    {mockPopularGames.map((game, index) => (
                      <div
                        key={game.id}
                        className="glass-card rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:border-roblox-red/30 border border-transparent"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-roblox flex items-center justify-center font-gaming text-white">
                          {index + 1}
                        </div>

                        <div className="w-16 h-16 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0">
                          <Gamepad2 className="w-8 h-8 text-muted-foreground/30" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-gaming text-lg truncate">
                            {game.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {game.genre}
                          </p>
                        </div>

                        <div className="hidden md:flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="text-muted-foreground text-xs">Visits</p>
                            <p className="font-gaming text-roblox-red">
                              {game.visits}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground text-xs">Playing</p>
                            <p className="font-gaming text-neon-green">
                              {game.playing}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground text-xs">Likes</p>
                            <p className="font-gaming">{game.likes}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
