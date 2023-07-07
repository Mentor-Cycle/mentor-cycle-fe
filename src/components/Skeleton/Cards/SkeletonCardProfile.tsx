import React from "react";
import Skeleton from "../Skeleton";

const SkeletonCardProfile = () => {
  return (
    <div className="min-h-[485px] max-w-[390px] sm:min-w-[280px] px-11 py-6 border w-full border-gray-03/30 rounded-lg shadow-sm shadow-gray-03 hover:opacity-90 transition-all">
      <div className="absolute right-2 top-2">
        <Skeleton className="w-12 h-4" />
      </div>
      <div>
        <Skeleton className="rounded-lg w-22 h-22" />
        <Skeleton className="h-6 mt-4 w-60" />
        <Skeleton className="h-4 mt-2 w-40" />
        <Skeleton className="h-3 mt-1 w-28" />
      </div>
      <div className="relative">
        <div className="flex gap-2 mt-2 rounded-lg">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-28 h-6" />
          <Skeleton className="w-24 h-6" />
        </div>
        <Skeleton className="flex w-full justify-end mt-2 px-2 max-w-[270px]" />
      </div>
      <div className="mt-8">
        <Skeleton className="h-24 mb-8" />
        <Skeleton className="w-24 h-10" />
      </div>
    </div>
  );
};

export default SkeletonCardProfile;
