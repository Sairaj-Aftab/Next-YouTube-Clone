"use client";
import { useDispatch } from "react-redux";
import MainPages from "./components/MainPages";
import MainView from "./components/MainView/MainView";
import { useEffect } from "react";
import { getAllVideos } from "@/redux/features/videos/videoApiSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);
  return (
    <MainPages>
      <MainView />
    </MainPages>
  );
}
