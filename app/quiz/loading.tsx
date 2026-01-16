import SkeletonLoader from "@/components/common/skeleton-loader";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="h-screen py-10 space-y-6 px-4">
      {/* Row 1 */}
      <div className="flex gap-5">
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
        <SkeletonLoader className="h-48 max-w-48 w-full rounded-lg" />
      </div>

      {/* Row 2 */}

      <SkeletonLoader className="h-48 w-full flex-1 rounded-lg" />

      {/* Row 3 */}
      <div className="flex gap-5">
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
      </div>
    </div>
  );
}
