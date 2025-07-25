import React, { ElementRef, forwardRef } from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-blue-600 text-white hover:bg-blue-700",
                destructive: "bg-red-600 text-white hover:bg-red-700",
                outline: "border border-gray-300 hover:bg-gray-100",
                subtle: "text-gray-700 hover:bg-gray-100",
                ghost: "hover:bg-gray-100",
                link: "underline text-blue-600 hover:text-blue-800",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 rounded-md",
                lg: "h-11 px-8 rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button = forwardRef<ElementRef<"button">, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return (
        <button
            className={cx(buttonVariants({ variant, size }), className)}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
