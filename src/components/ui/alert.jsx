import React from "react";
import { cx } from "class-variance-authority";
import { alertVariants } from "./alertVariants";

const Alert = React.forwardRef(({ className, variant, children, ...props }, ref) => {
    return (
        <div
            className={cx(alertVariants({ variant }), className)}
            ref={ref}
            role="alert"
            {...props}
        >
            {children}
        </div>
    );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <h5
            className={cx(
                "mb-1 font-semibold leading-none tracking-tight",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </h5>
    );
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            className={cx("text-sm [&_p]:leading-relaxed", className)}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
