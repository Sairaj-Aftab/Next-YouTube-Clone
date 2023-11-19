"use client";
import React, { useEffect, useRef, useState } from "react";
import MainPages from "../components/MainPages";
import { BsTrash3 } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import profileImg from "@/public/profile.jpg";
import { useSession } from "next-auth/react";
import viewsCountFormat from "@/utils/viewsCountFormat";
import timeAgo from "@/utils/timeAgo";
import { useDispatch, useSelector } from "react-redux";
import { getUser, trashHistory } from "@/redux/features/videos/videoApiSlice";
import swal from "sweetalert";
import { videosData } from "@/redux/features/videos/videoSlice";

function History() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { data: session } = useSession();
  const { user } = useSelector(videosData);

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

  const handleClearHistory = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(trashHistory(user?._id));
        swal("Poof! Your imaginary file has been trash!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
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
          {user?.history.length > 0 &&
            user?.history
              .map((data, index) => (
                <div
                  onMouseEnter={mouseHoverPlay}
                  onMouseLeave={mouseLeave}
                  className="w-full h-[165px] mt-3 flex flex-col gap-3 px-2 sm:px-0 group"
                >
                  <Link
                    href={`/video/${data.slug}/${data._id}`}
                    className="flex gap-2"
                  >
                    <div className="w-5/12 relative">
                      <video
                        ref={ref}
                        src={data.video}
                        className="rounded-lg cursor-pointer h-[165px] w-full"
                      ></video>
                      {data.thumbnail && (
                        <Image
                          src={data.thumbnail}
                          alt="Thumbnail"
                          width={300}
                          height={150}
                          className="absolute top-0 left-0 z-10 rounded-lg w-full h-[165px] object-cover cursor-pointer group-hover:hidden"
                        />
                      )}
                    </div>
                    <div className="w-7/12">
                      <h2 className="line-clamp-2 text-base leading-5 font-bold mb-2">
                        {data.title}
                      </h2>
                      <div>
                        <p className="text-sm text-[#aaa] font-semibold">
                          {data?.userId.name}
                        </p>
                        <p className="text-sm text-[#aaa] font-semibold">
                          {viewsCountFormat(data.views)} views .{" "}
                          {timeAgo(new Date(data.createdAt))}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
              .reverse()}
        </div>
        <div className="basis-1/3 hidden sm:block">
          <ul>
            <li
              onClick={handleClearHistory}
              className="flex gap-2 items-center bg-slate-950 p-1 rounded-md text-base font-semibold cursor-pointer"
            >
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
