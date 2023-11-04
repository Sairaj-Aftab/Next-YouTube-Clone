"use client";
import Image from "next/image";
import React from "react";
import { useState, useRef } from "react";
import profileImg from "@/public/profile.jpg";
import Link from "next/link";
import timeAgo from "@/utils/timeAgo";
import viewsCountFormat from "@/utils/viewsCountFormat";
import { useDispatch } from "react-redux";
import { updateViewsCounting } from "@/redux/features/videos/videoApiSlice";
function VideoCard({ videos }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [video, setVideo] = useState(false);
  const mouseHoverPlay = (e) => {
    e.preventDefault();
    setVideo(true);
    if (ref.current) {
      ref.current.play();
    }
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    setVideo(false);
    if (ref.current) {
      ref.current.pause();
    }
  };

  const handleUpdateViews = () => {
    dispatch(updateViewsCounting(videos?._id));
  };
  return (
    <div
      className="cursor-pointer flex flex-col gap-3"
      onMouseEnter={mouseHoverPlay}
      onMouseLeave={mouseLeave}
    >
      <Link href={`/video/${videos?._id}`} onClick={handleUpdateViews}>
        {video ? (
          <video ref={ref} src={videos.video} className="w-full h-52"></video>
        ) : (
          <Image
            src={videos.thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            alt="Thumbnail"
            className="w-full h-52 object-cover sm:rounded-md"
          />
        )}
      </Link>

      <div className="flex gap-2 px-2 sm:px-0">
        <Link href="/profile/65645">
          <Image
            src={profileImg}
            alt="Profile"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/video/${videos._id}`}
            className="text-lg font-normal text-white line-clamp-2 leading-5 md:leading-6"
          >
            {videos.title}
          </Link>
          <Link
            href="/profile/fjke564"
            className="text-[#aaa] text-sm font-normal mt-1 sm:mt-2"
          >
            Sairaj Aftab
          </Link>
          <Link
            href="/video/456345"
            className="text-[#aaa] text-sm font-normal"
          >
            {viewsCountFormat(videos.views)} views .{" "}
            {timeAgo(new Date(videos.createdAt))}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
