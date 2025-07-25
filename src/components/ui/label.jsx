import React from "react";
import { cx } from "class-variance-authority";
import { labelVariants } from "./labelVariants";

const Label = React.forwardRef(({ className, variant, children, ...props }, ref) => {
    return (
        <label
            className={cx(labelVariants({ variant }), className)}
            ref={ref}
            {...props}
        >
            {children}
        </label>
    );
});
Label.displayName = "Label";

export { Label };
