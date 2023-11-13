"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { videosData } from "@/redux/features/videos/videoSlice";
import Skeleton from "react-loading-skeleton";

function CategoryNav() {
  const { videos, loader } = useSelector(videosData);
  let allCatList = [];
  videos?.forEach((data) => {
    data.tags.forEach((tag) => {
      allCatList.push(tag);
    });
  });

  const handleSearchTag = (e) => {
    console.log(e.target.textContent);
  };

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
            <SwiperSlide>
              <Link
                href="/"
                className="text-[.8rem] sm:text-[1rem] py-[1px] sm:py-1 px-2"
              >
                All
              </Link>
            </SwiperSlide>
            {videos ? (
              allCatList?.map((data, index) => (
                <SwiperSlide key={index}>
                  <span
                    onClick={handleSearchTag}
                    className="text-[.8rem] sm:text-[1rem] py-[1px] sm:py-1 px-2 cursor-pointer"
                  >
                    {data}
                  </span>
                </SwiperSlide>
              ))
            ) : (
              <div className="flex gap-2">
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#444"
                  height={20}
                  width={90}
                />
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#444"
                  height={20}
                  width={90}
                />
              </div>
            )}
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
