import SkeletonLoader from "@/components/common/skeleton-loader";

export default function Loading() {
  return (
    <div className="h-screen py-10 space-y-3 px-4">
      <SkeletonLoader className="h-60 w-full rounded-lg" />

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
