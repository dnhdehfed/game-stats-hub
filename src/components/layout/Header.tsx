import { Link, useLocation } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-gradient-gaming glow-cyan">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-gaming text-xl text-gradient-gaming">
              GAME STATS
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/Fortnite"
              className={`font-medium transition-all duration-300 hover:text-fortnite-blue ${
                isActive("/Fortnite")
                  ? "text-fortnite-blue"
                  : "text-muted-foreground"
              }`}
            >
              Fortnite
            </Link>
            <Link
              to="/Roblox"
              className={`font-medium transition-all duration-300 hover:text-roblox-red ${
                isActive("/Roblox")
                  ? "text-roblox-red"
                  : "text-muted-foreground"
              }`}
            >
              Roblox
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
