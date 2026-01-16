// components/SkeletonLoader.tsx

import { cn } from "@/lib/utils";


interface SkeletonLoaderProps {
  className?: string;
}

export default function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div
      className={cn(
        "bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md",
        className
      )}
    />
  );
}
