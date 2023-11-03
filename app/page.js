// import { useDispatch } from "react-redux";
import MainView from "./components/MainView/MainView";
// import { useEffect } from "react";
// import { getAllVideos } from "@/redux/features/videos/videoApiSlice";

export default async function Home() {
  return (
    <main className="pl-0 sm:pl-[4.5rem] lg:pl-60">
      <MainView />
    </main>
  );
}
