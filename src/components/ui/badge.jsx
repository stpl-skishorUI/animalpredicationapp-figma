import React from "react";
import { cx } from "class-variance-authority";
import { badgeVariants } from "./badgeVariants";

const Badge = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (
        <span
            className={cx(badgeVariants({ variant, size }), className)}
            ref={ref}
            {...props}
        />
    );
});
Badge.displayName = "Badge";

export { Badge };
