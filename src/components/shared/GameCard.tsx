import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface GameCardProps {
  name: string;
  description: string;
  path: string;
  gradient: "fortnite" | "roblox";
  icon: React.ReactNode;
  stats?: string;
}

const GameCard = ({
  name,
  description,
  path,
  gradient,
  icon,
  stats,
}: GameCardProps) => {
  const getGradientClass = () => {
    return gradient === "fortnite"
      ? "bg-gradient-fortnite glow-fortnite"
      : "bg-gradient-roblox glow-roblox";
  };

  const getHoverClass = () => {
    return gradient === "fortnite"
      ? "hover:border-fortnite-blue/50"
      : "hover:border-roblox-red/50";
  };

  return (
    <Link
      to={path}
      className={`group glass-card rounded-2xl p-6 transition-all duration-500 hover:scale-105 ${getHoverClass()} block`}
    >
      <div
        className={`w-16 h-16 rounded-xl ${getGradientClass()} flex items-center justify-center mb-4 group-hover:animate-pulse-glow`}
      >
        {icon}
      </div>

      <h3 className="font-gaming text-2xl mb-2">{name}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>

      {stats && (
        <p className="text-sm text-primary font-medium mb-4">{stats}</p>
      )}

      <div className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
        <span className="font-medium">View Stats</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default GameCard;
