import { useApi } from "@/contexts/ApiContext";
import { useQuery } from "@tanstack/react-query";

export function useSavedDesigns() {
  const { getSavedDesignsByUser } = useApi();
  return useQuery({
    queryKey: ["savedDesignsByUser"],
    queryFn: getSavedDesignsByUser,
    staleTime: 60_000,
  });
}