import { useApi } from "@/contexts/ApiContext";
import { useQuery } from "@tanstack/react-query";

export function useUserChats() {
  const { getUserChats } = useApi();
  return useQuery({
    queryKey: ["userChats"],
    queryFn: getUserChats,
    staleTime: 30_000, // 30 seconds for real-time chats
  });
}