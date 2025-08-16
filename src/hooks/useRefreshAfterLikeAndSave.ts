// hooks/useRefreshAfterToggle.ts
import { useQueryClient } from "@tanstack/react-query";
export function useRefreshAfterToggle() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["savedDesignsByUser"] });
    qc.invalidateQueries({ queryKey: ["likedDesignsByUser"] });
  };
}
