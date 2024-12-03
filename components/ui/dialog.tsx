"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/src/app/lib/utils";
import {
  DialogContentProps,
  DialogContextProps,
  DialogOverlayProps,
  DialogType,
} from "@/utils/types/dialog";
import {
  dialogCloseVariants,
  dialogOverlayVariants,
  dialogVariants,
} from "@/utils/constants";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={dialogOverlayVariants({ variant, className })}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    { className, hideClose: _hideClose = false, variant, children, ...props },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay variant={variant} />
      <DialogPrimitive.Content
        ref={ref}
        className={dialogVariants({ variant, className })}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          asChild
          className={dialogCloseVariants({ variant })}
        >
          <X className="text-white" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight mr-[64px]",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground mr-[64px]", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogContext = React.createContext<DialogContextProps | undefined>(
  undefined
);

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<Record<DialogType, boolean>>({
    [DialogType.Connector]: false,
    [DialogType.AccountDetail]: false,
    [DialogType.SwitchChain]: false,
  });

  return (
    <DialogContext.Provider value={{ state, setState }}>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = (type: DialogType) => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Hook can only be used inside Modal Context");
  }

  const { state, setState } = context;

  return React.useMemo(
    () => ({
      open: Boolean(state[type]),
      setOpen: (val: boolean) => setState((prev) => ({ ...prev, [type]: val })),
    }),
    [state, setState, type]
  );
};

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPrimitive,
  DialogProvider,
  DialogTitle,
  DialogTrigger,
  DialogType,
  useDialog,
};
