"use client";
import HorizontalCardLoading from "@/app/components/LoadingComponents/HorizontalCardLoading";
import MainPages from "@/app/components/MainPages";
import CategoryNav from "@/app/components/MainView/CategoryNav";
import HorizontalCard from "@/app/components/VideoCard/HorizontalCard";
import { searchVideos } from "@/redux/features/videos/videoApiSlice";
import { videosData } from "@/redux/features/videos/videoSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SearchPage({ params }) {
  const dispatch = useDispatch();

  const {
    searchVideos: searchingVideos,
    message,
    loader,
  } = useSelector(videosData);

  useEffect(() => {
    dispatch(searchVideos(params?.slug.split("-").join(" ")));
  }, [dispatch]);
  return (
    <MainPages>
      <CategoryNav />
      <div className="mt-12">
        {searchingVideos ? (
          searchingVideos.map((data, index) => (
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
