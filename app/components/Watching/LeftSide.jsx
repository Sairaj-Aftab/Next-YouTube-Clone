"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import profileImg from "@/public/profile.jpg";
import { BiDislike, BiLike } from "react-icons/bi";
import Comments from "../Comments";
import ProfileDescSection from "../ProfileDescSection";

function LeftSide(video) {
  return (
    <>
      <div className="h-[475px]">
        {video.video && (
          <video
            // ref={ref}
            src={video.video.video}
            autoPlay={true}
            controls={true}
            className="w-full h-[475px]"
          ></video>
        )}
      </div>
      {/* Profile and Title Section */}
      <h1 className="px-2 sm:px-0 line-clamp-2 text-lg md:text-2xl font-semibold text-white">
        {video?.video?.title}
      </h1>
      {/* Profile and Description Section */}
      <ProfileDescSection />
      {/* Comment Section */}
      <Comments />
    </>
  );
}

export default LeftSide;
