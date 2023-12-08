"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { searchByTag, videosData } from "@/redux/features/videos/videoSlice";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";

function CategoryNav() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { videos, loader } = useSelector(videosData);
  let allCatList = [];
  videos?.forEach((data) => {
    data.tags.forEach((tag) => {
      allCatList.push(tag);
    });
  });

  const handleSearchTag = (e) => {
    router.push("/");
    dispatch(searchByTag(e.target.textContent));
  };
  const allVideos = () => {
    router.push("/");
    dispatch(searchByTag(null));
  };

  return (
    <div className="category_slide fixed z-[99999999] bg-[var(--base-background)] py-1 md:py-2 lg:py-3 mr-5">
      <div>
        <div className="flex gap-3 items-center">
          <Swiper
            slidesPerView="auto"
            spaceBetween={7}
            navigation={true}
            modules={[Navigation]}
          >
            {videos ? (
              <>
                <SwiperSlide>
                  <span
                    onClick={allVideos}
                    className="text-[.8rem] sm:text-[1rem] py-[1px] sm:py-1 px-2 cursor-pointer"
                  >
                    All
                  </span>
                </SwiperSlide>

                {allCatList?.map((data, index) => (
                  <SwiperSlide key={index}>
                    <span
                      onClick={handleSearchTag}
                      className="text-[.8rem] sm:text-[1rem] py-[1px] sm:py-1 px-2 cursor-pointer"
                    >
                      {data}
                    </span>
                  </SwiperSlide>
                ))}
              </>
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
        </div>
      </div>
    </div>
  );
}

export default CategoryNav;
