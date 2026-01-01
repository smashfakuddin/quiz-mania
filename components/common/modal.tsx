"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type CommonModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export function CommonModal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: CommonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="text-center text-xl font-semibold">{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
}
