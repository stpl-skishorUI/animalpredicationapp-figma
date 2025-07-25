import React from "react";
import { cx } from "class-variance-authority";
import { buttonVariants } from "./buttonVariants";

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (
        <button
            className={cx(buttonVariants({ variant, size }), className)}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button };
