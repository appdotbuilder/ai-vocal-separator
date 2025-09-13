import * as React from 'react';
import { cn } from '@/lib/utils';

interface DialogContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export function Dialog({ children, ...props }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    
    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            <div {...props}>{children}</div>
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children, ...props }: { children: React.ReactNode }) {
    const context = React.useContext(DialogContext);
    
    return (
        <div
            onClick={() => context?.setOpen(true)}
            {...props}
        >
            {children}
        </div>
    );
}

export function DialogContent({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
    const context = React.useContext(DialogContext);
    
    if (!context?.open) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div 
                className={cn(
                    "bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}

export function DialogTitle({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
    return (
        <h2 
            className={cn("text-lg font-semibold mb-2", className)}
            {...props}
        >
            {children}
        </h2>
    );
}

export function DialogDescription({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
    return (
        <p 
            className={cn("text-sm text-gray-600 dark:text-gray-400 mb-4", className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function DialogFooter({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
    return (
        <div 
            className={cn("flex justify-end space-x-2", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function DialogClose({ children, ...props }: { children: React.ReactNode }) {
    const context = React.useContext(DialogContext);
    
    return (
        <div
            onClick={() => context?.setOpen(false)}
            {...props}
        >
            {children}
        </div>
    );
}