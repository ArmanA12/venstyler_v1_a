import { useApi } from "@/contexts/ApiContext";
import { useQuery } from "@tanstack/react-query";

export function useLikedDesigns() {
  const { getLikedDesignsByUser } = useApi();
  return useQuery({
    queryKey: ["likedDesignsByUser"],
    queryFn: getLikedDesignsByUser,
    staleTime: 60_000,
  });
}