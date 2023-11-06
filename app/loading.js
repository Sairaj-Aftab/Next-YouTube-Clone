import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import MainPages from "./components/MainPages";

function Loading() {
  return (
    <MainPages>
      <SkeletonTheme
        className="h-full"
        baseColor="#202020"
        highlightColor="#444"
      >
        <Skeleton count={1} style={{ height: "calc(100vh - 70px)" }} />
      </SkeletonTheme>
    </MainPages>
  );
}

export default Loading;
