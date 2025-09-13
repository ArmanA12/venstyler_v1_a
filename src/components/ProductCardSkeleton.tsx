import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="fashion-card overflow-hidden">
      {/* Image skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-64" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Designer */}
        <Skeleton className="h-4 w-1/2" />
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </Card>
  );
};