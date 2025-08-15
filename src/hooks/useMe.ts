// hooks/useMe.ts
import { useApi } from "@/contexts/ApiContext";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  const { getMe } = useApi();
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 60_000,
  });
}
