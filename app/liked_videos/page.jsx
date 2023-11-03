import React from "react";
import MainPages from "../components/MainPages";
import VideoCard from "../components/VideoCard/VideoCard";

function LidedVideos() {
  return (
    <MainPages>
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-white my-2">
          Liked videos
        </h2>
        <div className="grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </MainPages>
  );
}

export default LidedVideos;
