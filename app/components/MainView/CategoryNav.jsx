"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { videosData } from "@/redux/features/videos/videoSlice";

function CategoryNav() {
  const { videos, loader } = useSelector(videosData);
  // const video = videos && videos.find();
  const allTags = new Set();

  // videos &&
  //   videos.length >= 0 &&
  //   videos.forEach((video: any) => {
  //     video.tags.forEach((tag: any) => {
  //       allTags.add(tag);
  //     });
  //   });

  // console.log(Array.from(allTags));

  const list = [
    "Coding Fun",
    "React JS",
    "Next JS",
    "Learn Play",
    "JavaScript Tutorial",
    "Let's Python",
    "Node JS",
    "Workout",
    "Jokes in Life",
    "Make Happy",
    "Works",
    "Friends Forever",
    "Hey Bro",
    "Fit daily",
    "Something wrong",
    "Life will be ended",
    "Life will be ended",
    "Life will be ended",
    "Life will be ended",
    "Life will be ended",
    "Life will be ended",
    "Life will be ended",
    "Life will be ended",
    "Life will be ended",
  ];
  return (
    <div className="category_slide fixed z-40 bg-[var(--base-background)] py-1 md:py-2 lg:py-3 mr-5">
      <div>
        <div className="flex gap-3 items-center">
          <Swiper
            slidesPerView="auto"
            spaceBetween={7}
            navigation={true}
            modules={[Navigation]}
          >
            {list?.map((data, index) => (
              <SwiperSlide key={index}>
                <Link
                  href="/"
                  className="text-[.8rem] sm:text-[1rem] py-[1px] sm:py-1 px-2"
                >
                  {data}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* {list.map((item, index) => (
            <li
              key={index}
              className="first:bg-white first:text-black bg-[#272727] hover:bg-[#3c3c3c] rounded-md text-[var(--primary-text)]"
            >
              <a
                href="/"
                className="text-[.8rem] sm:text-[1rem] py-[1px] sm:py-1 px-2"
              >
                {item}
              </a>
            </li>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default CategoryNav;
