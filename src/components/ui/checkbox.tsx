import React from "react";
import { cx } from "class-variance-authority";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ id, checked, onCheckedChange, disabled, className, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
                disabled={disabled}
                className={cx("cursor-pointer", className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
