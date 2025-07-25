import { cva } from "class-variance-authority";

export const cardVariants = cva(
    "rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
    {
        variants: {
            variant: {
                default: "border-gray-200 bg-white",
                subtle: "border-gray-100 bg-gray-50",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);
