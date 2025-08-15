// hooks/useMyProfileImage.ts
import { useApi } from "@/contexts/ApiContext";
import { useQuery } from "@tanstack/react-query";

export function useMyProfileImage() {
  const { getMyProfileImage } = useApi();
  return useQuery({
    queryKey: ["me", "profileImage"],
    queryFn: getMyProfileImage,
    staleTime: 60_000,
  });
}
