"use client";
import React from "react";
import CategoryNav from "./CategoryNav";
import VideoCard from "../VideoCard/VideoCard";
import { useSelector } from "react-redux";
import { videosData } from "@/redux/features/videos/videoSlice";

function MainView() {
  const { videos, tags, loader } = useSelector(videosData);

  return (
    <div className="mt-[45px] sm:mt-[55px]">
      <div>
        <CategoryNav />
        <div className="pt-11 sm:pt-12 grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7">
          {videos?.map((data, index) => (
            <VideoCard key={index} videos={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainView;
