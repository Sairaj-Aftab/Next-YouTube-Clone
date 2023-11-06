// import { useDispatch } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import MainPages from "./components/MainPages";
import MainView from "./components/MainView/MainView";
// import { useEffect } from "react";
// import { getAllVideos } from "@/redux/features/videos/videoApiSlice";

export default async function Home() {
  return (
    // className="pl-0 sm:pl-[4.5rem] lg:pl-60"

    <main>
      <MainView />
    </main>
  );
}
