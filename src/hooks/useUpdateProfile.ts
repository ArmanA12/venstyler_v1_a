// hooks/useUpdateProfile.ts
import { useApi } from "@/contexts/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile() {
  const { updateProfile } = useApi();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success("Profile updated", { description: "Your changes were saved." });
      // update caches
      qc.setQueryData(["myProfile"], data);
      qc.setQueryData(["me"], (prev: any) => prev ? { ...prev, profileImage: data.profileImage, name: data.name, email: data.email } : prev);
      qc.setQueryData(["me", "profileImage"], data.profileImage ?? null);
    },
    onError: (e) => {
      toast.error("Update failed", {
        description: e instanceof Error ? e.message : "Please try again.",
      });
    },
  });
}
