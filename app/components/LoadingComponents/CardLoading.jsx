import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function CardLoading() {
  return (
    <div>
      <Skeleton className="h-52" baseColor="#202020" highlightColor="#444" />
      <div className="flex gap-3">
        <Skeleton
          baseColor="#202020"
          highlightColor="#444"
          width={45}
          height={45}
          circle={50}
        />
        <div className="w-full">
          <Skeleton
            baseColor="#202020"
            highlightColor="#444"
            height={20}
            className="w-full"
          />
          <Skeleton
            baseColor="#202020"
            highlightColor="#444"
            height={10}
            width={200}
          />
        </div>
      </div>
    </div>
  );
}

export default CardLoading;
