"use client";
import React from "react";
import Comments from "../Comments";
import ProfileDescSection from "../ProfileDescSection";

function LeftSide({ video, params }) {
  return (
    <>
      <div className="h-[475px]">
        {video && (
          <video
            // ref={ref}
            src={video.video}
            autoPlay={true}
            controls={true}
            className="w-full h-[475px]"
          ></video>
        )}
      </div>
      {/* Profile and Title Section */}
      <h1 className="px-2 sm:px-0 line-clamp-2 text-lg md:text-2xl font-semibold text-white">
        {video?.title}
      </h1>
      {/* Profile and Description Section */}
      <ProfileDescSection />
      {/* Comment Section */}
      <Comments params={params} />
    </>
  );
}

export default LeftSide;
