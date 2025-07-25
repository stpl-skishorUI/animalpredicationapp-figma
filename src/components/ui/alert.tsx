import React, { ElementRef, forwardRef, ReactNode } from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

const alertVariants = cva(
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

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    children?: ReactNode;
}

const Alert = forwardRef<ElementRef<"div">, AlertProps>(({ className, variant, children, ...props }, ref) => {
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

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
}

const AlertTitle = forwardRef<ElementRef<"h5">, AlertTitleProps>(({ className, children, ...props }, ref) => {
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

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

const AlertDescription = forwardRef<ElementRef<"div">, AlertDescriptionProps>(({ className, children, ...props }, ref) => {
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

export { Alert, AlertTitle, AlertDescription, alertVariants };
