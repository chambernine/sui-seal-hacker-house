import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-white shadow-lg hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 hover:shadow-xl hover:shadow-destructive/20 dark:hover:shadow-destructive/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:bg-input/20 dark:border-input/60 dark:hover:bg-input/40 hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-300",
        premium:
          "bg-gradient-to-r from-chart-1 via-primary to-chart-3 text-white shadow-lg hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-5 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
