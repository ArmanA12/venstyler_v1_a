import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
      </Card>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="w-4 h-4" />
            </div>
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>
      
      {/* Recent Orders Table */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};