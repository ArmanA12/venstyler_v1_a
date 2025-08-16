// hooks/useProfileImage.ts
import { useApi } from "@/contexts/ApiContext";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

type UseProfileImageOpts = {
  onSuccess?: (url: string) => void;
  onError?: (err: unknown) => void;
};

export function useProfileImage(opts: UseProfileImageOpts = {}) {
  const { uploadProfileImage } = useApi();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadMut = useMutation({
    mutationFn: async (file: File) => {
      if (!file.type.startsWith("image/")) throw new Error("Please select an image file");
      if (file.size > 5 * 1024 * 1024) throw new Error("Max 5MB allowed");
      return uploadProfileImage(file);
    },
    onSuccess: (url) => {
      toast.success("Profile image updated", {
        description: "Your profile picture has been uploaded successfully.",
      });
      opts.onSuccess?.(url);
      // optional: once server url arrives, drop the local blob preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    },
    onError: (e) => {
      toast.error("Upload failed", {
        description:
          e instanceof Error ? e.message : "Something went wrong while uploading your image.",
      });
      opts.onError?.(e);
    },
  });

  const remove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    opts.onSuccess?.(""); // tell parent to clear state
    toast("Profile image removed", {
      description: "Your profile picture has been cleared locally.",
    });
  }, [opts, previewUrl]);

  const openPicker = useCallback(() => fileInputRef.current?.click(), []);

  const onPickFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      // show instant local preview
      const local = URL.createObjectURL(file);
      // kill any previous blob url to avoid leaks
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(local);
      uploadMut.mutate(file);
      // reset input value so selecting the same file again still triggers change
      e.currentTarget.value = "";
    },
    [uploadMut, previewUrl]
  );

  // attrs to spread on your <input> from the component
  const inputAttrs = {
    type: "file" as const,
    accept: "image/*",
    onChange: onPickFile,
  };

  return {
    inputRef: fileInputRef,
    inputAttrs,
    openPicker,
    previewUrl,
    uploading: uploadMut.isPending,
    remove,
  };
}
