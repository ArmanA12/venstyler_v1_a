import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const FeedSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="fashion-card border-b border-border/30 overflow-hidden">
          {/* Header */}
          <div className="p-6 flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="w-8 h-8 rounded-md" />
          </div>
          
          {/* Image */}
          <div className="relative">
            <Skeleton className="w-full h-80" />
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="w-8 h-8 rounded-md" />
                <Skeleton className="w-8 h-8 rounded-md" />
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            
            {/* Button */}
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );
};