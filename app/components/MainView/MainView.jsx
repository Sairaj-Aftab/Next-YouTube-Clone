"use client";
import React, { useEffect } from "react";
import CategoryNav from "./CategoryNav";
import VideoCard from "../VideoCard/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { videosData } from "@/redux/features/videos/videoSlice";
import CardLoading from "../LoadingComponents/CardLoading";
import { getAllVideos, getUser } from "@/redux/features/videos/videoApiSlice";

function MainView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideos());
    dispatch(getUser());
  }, [dispatch]);

  const { videos, videosByTag } = useSelector(videosData);

  return (
    <>
      <CategoryNav />
      {!videosByTag && (
        <div className="pt-11 sm:pt-12 grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7">
          {/* {loader && <CardLoading />} */}
          {videos ? (
            videos?.map((data, index) => (
              <VideoCard key={index} videos={data} />
            ))
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
      )}

      {videosByTag && (
        <div className="pt-11 sm:pt-12 grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7">
          {videosByTag?.map((data, index) => (
            <VideoCard key={index} videos={data} />
          ))}
        </div>
      )}
    </>
  );
}

export default MainView;
