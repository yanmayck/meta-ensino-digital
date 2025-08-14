
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <Card key={i}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
