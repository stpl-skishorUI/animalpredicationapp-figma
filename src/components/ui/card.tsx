import React, { ElementRef, forwardRef, ReactNode } from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

const cardVariants = cva(
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

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    children?: ReactNode;
}

const Card = forwardRef<ElementRef<"div">, CardProps>(({ className, variant, children, ...props }, ref) => {
    return (
        <div
            className={cx(cardVariants({ variant }), className)}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
});
Card.displayName = "Card";

interface CardSubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

const CardHeader = forwardRef<ElementRef<"div">, CardSubComponentProps>(({ className, children, ...props }, ref) => {
    return (
        <div
            className={cx("flex flex-col space-y-1.5 p-4", className)}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
});
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<ElementRef<"h3">, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => {
    return (
        <h3
            className={cx(
                "text-lg font-semibold leading-none tracking-tight",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </h3>
    );
});
CardTitle.displayName = "CardTitle";

const CardContent = forwardRef<ElementRef<"div">, CardSubComponentProps>(({ className, children, ...props }, ref) => {
    return (
        <div className={cx("p-4 pt-0", className)} ref={ref} {...props}>
            {children}
        </div>
    );
});
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent, cardVariants };
