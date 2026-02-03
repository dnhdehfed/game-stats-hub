import { Sword, Blocks, Zap, Users, Trophy, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameCard from "@/components/shared/GameCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(185_100%_50%/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(280_100%_60%/0.1),transparent_50%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Real-time Gaming Statistics</span>
              </div>

              <h1 className="font-gaming text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient-gaming">TRACK YOUR</span>
                <br />
                <span className="text-foreground">GAMING STATS</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Get detailed analytics for your favorite games. Track K/D ratios, 
                wins, inventory values, and more across Fortnite and Roblox.
              </p>

              {/* Stats Preview */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-16">
                <div className="glass-card rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-gaming text-xl">10M+</p>
                  <p className="text-xs text-muted-foreground">Players Tracked</p>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <Trophy className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                  <p className="font-gaming text-xl">500K+</p>
                  <p className="text-xs text-muted-foreground">Games Analyzed</p>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-neon-green mx-auto mb-2" />
                  <p className="font-gaming text-xl">Live</p>
                  <p className="text-xs text-muted-foreground">Data Updates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-gaming text-3xl lg:text-4xl mb-4">
                SELECT YOUR <span className="text-gradient-gaming">GAME</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Choose a game to start tracking player statistics and analytics
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <GameCard
                name="FORTNITE"
                description="Track player stats, K/D ratios, wins, and browse the current item shop"
                path="/Fortnite"
                gradient="fortnite"
                icon={<Sword className="w-8 h-8 text-white" />}
                stats="Player Stats • Item Shop • Locker"
              />

              <GameCard
                name="ROBLOX"
                description="Explore game analytics, user inventory, RAP values, and popular games"
                path="/Roblox"
                gradient="roblox"
                icon={<Blocks className="w-8 h-8 text-white" />}
                stats="Game Analytics • User RAP • Inventory"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-card/30 to-transparent">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-gaming mx-auto mb-4 flex items-center justify-center glow-cyan">
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-gaming text-lg mb-2">REAL-TIME DATA</h3>
                <p className="text-muted-foreground text-sm">
                  Get the latest stats updated in real-time as you play
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink mx-auto mb-4 flex items-center justify-center glow-purple">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-gaming text-lg mb-2">DETAILED ANALYTICS</h3>
                <p className="text-muted-foreground text-sm">
                  Deep dive into your performance with comprehensive charts
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-green to-primary mx-auto mb-4 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-gaming text-lg mb-2">LEADERBOARDS</h3>
                <p className="text-muted-foreground text-sm">
                  Compare your stats with players worldwide
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
