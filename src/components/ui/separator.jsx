import React from "react";
import { cx } from "class-variance-authority";
import { separatorVariants } from "./separatorVariants";

const Separator = React.forwardRef(({ className, variant, orientation, ...props }, ref) => {
    return (
        <div
            role="separator"
            className={cx(separatorVariants({ variant, orientation }), className)}
            ref={ref}
            {...props}
        />
    );
});
Separator.displayName = "Separator";

export { Separator };
