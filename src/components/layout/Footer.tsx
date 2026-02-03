import { Gamepad2, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-gaming">
              <Gamepad2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-gaming text-lg text-gradient-gaming">
              GAME STATS
            </span>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            Track your gaming stats across multiple platforms
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
