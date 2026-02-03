import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        gaming: "border-primary/30 bg-secondary/50 focus-visible:ring-primary focus-visible:border-primary",
        fortnite: "border-fortnite-blue/30 bg-secondary/50 focus-visible:ring-fortnite-blue focus-visible:border-fortnite-blue",
        roblox: "border-roblox-red/30 bg-secondary/50 focus-visible:ring-roblox-red focus-visible:border-roblox-red",
        glass: "glass border-white/20 focus-visible:ring-white/50 focus-visible:border-white/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
