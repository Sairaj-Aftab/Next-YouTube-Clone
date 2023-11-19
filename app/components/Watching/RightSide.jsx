"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import profileImg from "@/public/profile.jpg";
import viewsCountFormat from "@/utils/viewsCountFormat";
import timeAgo from "@/utils/timeAgo";

const demoText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors ";

function RightSide({ videos }) {
  const ref = useRef(null);

  const mouseHoverPlay = (e) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.volume = 0;
      ref.current.play();
    }
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.pause();
    }
  };
  return (
    <>
      <h1 className="text-xl text-white font-bold">Suggest more...</h1>
      {videos &&
        videos?.map((data, index) => (
          <div
            onMouseEnter={mouseHoverPlay}
            onMouseLeave={mouseLeave}
            className="w-full h-[100px] mt-3 flex flex-col gap-3 group"
          >
            <Link
              href={`/video/${data.slug}/${data._id}`}
              className="flex gap-2"
            >
              <div className="w-5/12 relative">
                <video
                  ref={ref}
                  src={data.video}
                  className="rounded-lg cursor-pointer h-[100px] w-full"
                ></video>
                {data.thumbnail && (
                  <Image
                    src={data.thumbnail}
                    alt="Thumbnail"
                    width={300}
                    height={150}
                    className="absolute top-0 left-0 z-10 group-hover:hidden rounded-lg w-[300px] h-[100px] object-cover cursor-pointer"
                  />
                )}
              </div>
              <div className="w-7/12">
                <h2 className="line-clamp-2 text-base leading-5 font-bold mb-2">
                  {data.desc}
                </h2>
                <div>
                  <p className="text-xs text-[#aaa] font-normal">
                    {data.userId?.name}
                  </p>
                  <p className="text-xs text-[#aaa] font-normal">
                    {viewsCountFormat(data.views)} views .{" "}
                    {timeAgo(new Date(data.createdAt))}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}

export default RightSide;
