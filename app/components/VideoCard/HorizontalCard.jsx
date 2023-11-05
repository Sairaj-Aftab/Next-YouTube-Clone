"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import profileImg from "@/public/profile.jpg";
import timeAgo from "@/utils/timeAgo";

const demoText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors ";

function HorizontalCard({ videos }) {
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
  return (
    <div className="w-full mt-3 flex flex-col gap-3">
      <Link href={`/video/fjkdfj434`} className="w-full flex gap-3 h-[202px]">
        <div
          className="w-[360px]"
          onMouseEnter={mouseHoverPlay}
          onMouseLeave={mouseLeave}
        >
          {video ? (
            <video
              ref={ref}
              src={videos?.video}
              className="rounded-lg cursor-pointer"
            ></video>
          ) : (
            <Image
              src={videos?.thumbnail}
              alt="Thumbnail"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-lg w-full h-full object-cover cursor-pointer"
            />
          )}
        </div>
        <div style={{ width: "calc(100% - 372px)" }}>
          <div>
            <h1 className="text-base font-bold">{videos?.title}</h1>
            <p className="text-xs text-[#aaa] font-normal">
              {videos?.views} views . {timeAgo(new Date(videos?.createdAt))}
            </p>
            <div className="my-3 flex gap-2 items-center">
              <Image
                src={profileImg}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="w-[30px] h-[30px] rounded-full object-cover"
              />
              <p className="text-xs text-[#aaa] font-normal">
                {videos?.userId?.name}
              </p>
            </div>
            <p className="line-clamp-1 text-sm text-[#aaa] leading-5 font-normal">
              {videos?.desc}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HorizontalCard;
