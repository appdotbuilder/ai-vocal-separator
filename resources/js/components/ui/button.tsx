import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild, children, ...props }, ref) => {
        const variantClasses = variant === 'default' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : variant === 'outline'
            ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            : variant === 'destructive'
            ? 'bg-red-600 text-white hover:bg-red-700'
            : variant === 'secondary'
            ? 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
            : variant === 'ghost'
            ? 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100'
            : 'text-blue-600 underline-offset-4 hover:underline';

        const sizeClasses = size === 'sm' 
            ? 'h-9 rounded-md px-3' 
            : size === 'lg'
            ? 'h-11 rounded-md px-8'
            : size === 'icon'
            ? 'h-10 w-10'
            : 'h-10 px-4 py-2';

        const baseClasses = cn(
            'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
            variantClasses,
            sizeClasses,
            className
        );

        // If asChild is true, render the children directly with button styling
        if (asChild) {
            if (React.isValidElement(children)) {
                return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
                    className: cn(baseClasses, (children as React.ReactElement<{ className?: string }>).props.className),
                    ...props,
                });
            }
            // If asChild but no valid child element, render as normal button
        }

        return (
            <button
                className={baseClasses}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button };