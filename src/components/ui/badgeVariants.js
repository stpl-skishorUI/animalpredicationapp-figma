import { cva } from "class-variance-authority";

export const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-gray-100 text-gray-800",
                secondary: "bg-gray-200 text-gray-900",
                destructive: "bg-red-100 text-red-800",
                outline: "border border-gray-300 bg-transparent text-gray-800",
            },
            size: {
                default: "h-5",
                sm: "h-4 text-[10px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);
