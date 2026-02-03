import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: "default" | "fortnite" | "roblox";
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  variant = "default",
  trend,
}: StatCardProps) => {
  const getGradientClass = () => {
    switch (variant) {
      case "fortnite":
        return "from-fortnite-blue/20 to-fortnite-purple/20 border-fortnite-blue/30";
      case "roblox":
        return "from-roblox-red/20 to-roblox-coral/20 border-roblox-red/30";
      default:
        return "from-primary/20 to-accent/20 border-primary/30";
    }
  };

  const getIconClass = () => {
    switch (variant) {
      case "fortnite":
        return "text-fortnite-blue";
      case "roblox":
        return "text-roblox-red";
      default:
        return "text-primary";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-neon-green";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      className={`glass-card rounded-xl p-5 bg-gradient-to-br ${getGradientClass()} transition-all duration-300 hover:scale-105`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <p className={`font-gaming text-2xl mt-1 ${getTrendColor()}`}>
            {value}
          </p>
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg bg-secondary/50 ${getIconClass()}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
