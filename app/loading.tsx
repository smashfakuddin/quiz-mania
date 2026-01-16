import SkeletonLoader from "@/components/common/skeleton-loader";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-4 w-3/4 flex flex-col items-center">
        {/* Main Title */}
        <SkeletonLoader className="h-16 w-3/4 rounded-lg" />

        {/* Description */}
        <SkeletonLoader className="h-6 w-full rounded-md" />
        <SkeletonLoader className="h-6 w-full rounded-md" />

        {/* Button */}
        <SkeletonLoader className="h-12 w-1/3 rounded-full mt-4" />
      </div>
    </div>
  );
}
