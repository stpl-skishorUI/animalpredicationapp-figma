import { cva } from "class-variance-authority";

export const inputVariants = cva(
    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "border-gray-300 focus:ring-blue-600 focus:border-blue-600",
                error: "border-red-600 focus:ring-red-600 focus:border-red-600",
            },
            size: {
                default: "h-10 px-3",
                sm: "h-9 px-2",
                lg: "h-12 px-4",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);
