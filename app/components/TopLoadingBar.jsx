"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
// import LoadingBar from "react-top-loading-bar";

function TopLoadingBar() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  return (
    <LoadingBar
      color="#f11946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
}

export default TopLoadingBar;
