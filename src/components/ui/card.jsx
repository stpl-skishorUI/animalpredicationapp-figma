import React from "react";
import { cx } from "class-variance-authority";
import { cardVariants } from "./cardVariants";

const Card = React.forwardRef(({ className, variant, children, ...props }, ref) => {
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

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => {
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

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => {
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

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div className={cx("p-4 pt-0", className)} ref={ref} {...props}>
            {children}
        </div>
    );
});
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
