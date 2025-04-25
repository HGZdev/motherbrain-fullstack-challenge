import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary focus-visible:ring-primary",
        destructive:
          "bg-destructive text-primary-foreground shadow hover:bg-destructive focus-visible:ring-destructive",
        outline:
          "border border-border bg-background text-primary-foreground shadow hover:bg-muted focus-visible:ring-border",
        secondary:
          "bg-secondary text-secondary-foreground shadow hover:bg-secondary focus-visible:ring-secondary",
        ghost:
          "hover:bg-muted text-primary-foreground focus-visible:ring-muted",
        link: "text-primary-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9.5 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4",
        icon: "h-14 w-14 rounded-full [&_svg]:h-6 [&_svg]:w-6",
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
