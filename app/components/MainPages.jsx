"use client";
import { getAllVideos } from "@/redux/features/videos/videoApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function MainPages({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);
  return <div className="pl-0 sm:pl-[4.5rem] lg:pl-60 pt-16">{children}</div>;
}

export default MainPages;
