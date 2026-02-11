import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative bg-linear-to-br from-gray-100 to-gray-200">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </Card>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}