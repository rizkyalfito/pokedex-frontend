import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50">
      <div className="aspect-square relative bg-linear-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center">
        <Skeleton className="w-32 h-32 rounded-full bg-slate-600/20" />
      </div>
      <div className="p-5 bg-slate-900/80 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-slate-700/50" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full bg-slate-700/50" />
          <Skeleton className="h-6 w-20 rounded-full bg-slate-700/50" />
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