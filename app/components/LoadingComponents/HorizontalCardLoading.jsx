import React from "react";
import Skeleton from "react-loading-skeleton";

function HorizontalCardLoading() {
  return (
    <div className="flex h-[202px]">
      <Skeleton className="w-[202px] h-[360px] rounded-lg" />
      <div style={{ width: "calc(100% - 372px)" }}>
        <Skeleton className="w-full" height={20} />
        <Skeleton className="w-full" height={10} />
        <Skeleton className="w-full" height={15} />
      </div>
    </div>
  );
}

export default HorizontalCardLoading;
