import { cva } from "class-variance-authority";

export const separatorVariants = cva(
    "bg-gray-200",
    {
        variants: {
            variant: {
                default: "bg-gray-200",
                destructive: "bg-red-600",
            },
            orientation: {
                horizontal: "h-px w-full",
                vertical: "h-full w-px",
            },
        },
        defaultVariants: {
            variant: "default",
            orientation: "horizontal",
        },
    }
);
