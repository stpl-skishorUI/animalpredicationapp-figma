import { cva } from "class-variance-authority";

export const alertVariants = cva(
    "rounded-md border p-4 text-sm font-medium",
    {
        variants: {
            variant: {
                default: "bg-gray-100 border-gray-300 text-gray-800",
                destructive: "bg-red-100 border-red-300 text-red-800",
                warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
                success: "bg-green-100 border-green-300 text-green-800",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);
