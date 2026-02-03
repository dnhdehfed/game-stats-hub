import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  variant?: "gaming" | "fortnite" | "roblox";
  buttonText?: string;
}

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  variant = "gaming",
  buttonText = "Search",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant={variant}
          className="pl-10 h-12"
        />
      </div>
      <Button type="submit" variant={variant} size="lg">
        {buttonText}
      </Button>
    </form>
  );
};

export default SearchBar;
