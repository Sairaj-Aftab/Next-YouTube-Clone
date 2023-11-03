"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import profileImg from "@/public/profile.jpg";

const demoText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors ";

function RightSide() {
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
    <>
      <h1 className="text-xl text-white font-bold">Suggest more...</h1>
      <div className="w-full mt-3 flex flex-col gap-3">
        <Link href={`/video/fjkdfj434`} className="flex gap-2">
          <div
            className="w-5/12"
            onMouseEnter={mouseHoverPlay}
            onMouseLeave={mouseLeave}
          >
            {video ? (
              <video
                ref={ref}
                src="/video.mp4"
                className="rounded-lg cursor-pointer"
              ></video>
            ) : (
              <Image
                src={profileImg}
                alt="Thumbnail"
                width={300}
                height={150}
                className="rounded-lg w-[300px] h-[100px] object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="w-7/12">
            <h2 className="line-clamp-2 text-base leading-5 font-bold mb-2">
              {demoText}
            </h2>
            <div>
              <p className="text-sm text-[#aaa] font-semibold">
                Learn With Sairaj
              </p>
              <p className="text-sm text-[#aaa] font-semibold">
                2.4M views . 5 years ago
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default RightSide;
