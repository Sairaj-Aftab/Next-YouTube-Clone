"use client";
import React, { useRef, useState } from "react";
import MainPages from "../components/MainPages";
import { BsTrash3 } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import profileImg from "@/public/profile.jpg";

const demoText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors ";

function History() {
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
    <MainPages>
      <div className="sm:flex gap-3">
        <div className="basis-2/3">
          <div className="flex justify-between items-center px-2 sm:px-0">
            <h4 className="text-lg md:text-xl font-semibold text-white">
              Watch history
            </h4>
            <div className="flex gap-1 items-center text-sm font-semibold sm:hidden">
              <BsTrash3 />
              <span>Clear all watch history</span>
            </div>
          </div>
          <div className="w-full mt-3 flex flex-col gap-3 px-2 sm:px-0">
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
                    className="rounded-lg w-[300px] h-[165px] object-cover cursor-pointer"
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
        </div>
        <div className="basis-1/3 hidden sm:block">
          <ul>
            <li className="flex gap-2 items-center bg-slate-950 p-1 rounded-md text-base font-semibold cursor-pointer">
              <BsTrash3 />
              <span>Clear all watch history</span>
            </li>
          </ul>
        </div>
      </div>
    </MainPages>
  );
}

export default History;
