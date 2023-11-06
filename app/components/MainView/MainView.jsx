"use client";
import React from "react";
import CategoryNav from "./CategoryNav";
import VideoCard from "../VideoCard/VideoCard";
import { useSelector } from "react-redux";
import { videosData } from "@/redux/features/videos/videoSlice";
import HorizontalCard from "../VideoCard/HorizontalCard";
import MainPages from "../MainPages";
import CardLoading from "../LoadingComponents/CardLoading";

function MainView() {
  const { videos, tags, loader } = useSelector(videosData);

  return (
    <MainPages>
      <CategoryNav />

      <div className="pt-11 sm:pt-12 grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7">
        {/* {loader && <CardLoading />} */}
        {videos ? (
          videos?.map((data, index) => <VideoCard key={index} videos={data} />)
        ) : (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        )}
      </div>
    </MainPages>
  );
}

export default MainView;
