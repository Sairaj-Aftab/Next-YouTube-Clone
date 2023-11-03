import React from "react";
import MainPages from "../components/MainPages";
import VideoCard from "../components/VideoCard/VideoCard";

function Library() {
  return (
    <MainPages>
      <div>
        {/* History */}
        <div className="my-1 md:my-3 px-2 sm:px-0">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            History
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
        {/* Liked Videos */}
        <div className="my-1 md:my-3 px-2 sm:px-0 mt-5">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            Liked Videos 234
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-y-3 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 md:grid md:grid-cols-3 md:gap-x-3 md:gap-y-7">
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </MainPages>
  );
}

export default Library;
