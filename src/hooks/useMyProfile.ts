// hooks/useMyProfile.ts
import { useApi } from "@/contexts/ApiContext";
import { useQuery } from "@tanstack/react-query";

export function useMyProfile() {
  const { getMyProfile } = useApi();
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
    staleTime: 120_000,
  });
}
