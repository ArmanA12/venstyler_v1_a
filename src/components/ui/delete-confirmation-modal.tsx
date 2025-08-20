import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Product",
  description = "This action cannot be undone. This will permanently delete the product and remove all associated data.",
  itemName,
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] overflow-clip border-2 border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-8 h-8 text-destructive animate-bounce" />
          </div>
          <DialogTitle className="text-xl font-bold text-center text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center">
            {itemName && (
              <div className="mb-3">
                <span className="font-semibold text-foreground">"{itemName}"</span>
              </div>
            )}
            {description}
          </DialogDescription>
        </DialogHeader>
                <div className="w-96 absolute top-0 h-20 bg-red-700 blur-[100px] "></div>


        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 my-4">
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">Warning: This action is irreversible</span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto order-2 sm:order-1 border-border/50 hover:bg-accent/50"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2 bg-destructive hover:bg-destructive/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Product
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};