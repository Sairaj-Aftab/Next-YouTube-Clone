import React from "react";
import MainPages from "../components/MainPages";
import VideoCard from "../components/VideoCard/VideoCard";

function Subscriptions() {
  return (
    <MainPages>
      <div>
        {/* Title.... */}
        <div className="my-1 md:my-3 px-2 sm:px-0">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            Latest
          </h3>
        </div>
        {/* Feed */}
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

export default Subscriptions;
