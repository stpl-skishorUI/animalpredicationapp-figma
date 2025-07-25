import { cva } from "class-variance-authority";

export const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            variant: {
                default: "text-gray-900",
                secondary: "text-gray-500",
                destructive: "text-red-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);
