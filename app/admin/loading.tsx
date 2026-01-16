import SkeletonLoader from "@/components/common/skeleton-loader";

export default function Loading() {
  return (
    <div className="h-screen py-10 space-y-3 px-4">
      {/* Main big skeleton */}
      <SkeletonLoader className="h-72 w-full rounded-lg" />

      {/* Row of smaller skeleton cards */}
      <div className="flex gap-5">
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
      </div>
      <div className="flex gap-5">
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
        <SkeletonLoader className="h-48 flex-1 rounded-lg" />
      </div>
    </div>
  );
}
