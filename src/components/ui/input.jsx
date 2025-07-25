import React from "react";
import { cx } from "class-variance-authority";
import { inputVariants } from "./inputVariants";

const Input = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (
        <input
            className={cx(inputVariants({ variant, size }), className)}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
