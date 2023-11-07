"use client";
import HorizontalCardLoading from "@/app/components/LoadingComponents/HorizontalCardLoading";
import MainPages from "@/app/components/MainPages";
import CategoryNav from "@/app/components/MainView/CategoryNav";
import HorizontalCard from "@/app/components/VideoCard/HorizontalCard";
import { videosData } from "@/redux/features/videos/videoSlice";
import React from "react";
import { useSelector } from "react-redux";

function SearchPage({ params }) {
  const { searchVideos, message, loader } = useSelector(videosData);
  return (
    <MainPages>
      <CategoryNav />
      <div className="mt-12">
        {searchVideos ? (
          searchVideos.map((data, index) => (
            <HorizontalCard key={index} videos={data} />
          ))
        ) : (
          <h1 className="text-2xl flex justify-center items-center h-80">
            {message}
          </h1>
        )}
      </div>
    </MainPages>
  );
}

export default SearchPage;
