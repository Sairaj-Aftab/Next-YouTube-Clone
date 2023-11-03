"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineLike,
  AiOutlineFieldTime,
  AiOutlineHistory,
  AiOutlineVideoCamera,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineVideoLibrary, MdOutlineSubscriptions } from "react-icons/md";
import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";

function HomeSideBar() {
  const { data: session } = useSession();

  const [hide, setHide] = useState(false);

  const pathname = usePathname();

  const list = [
    {
      icon: <AiOutlineHome />,
      title: "Home",
      link: "/",
    },
    {
      icon: <AiOutlinePlayCircle />,
      title: "Shorts",
      link: "/",
    },
    {
      icon: <MdOutlineSubscriptions />,
      title: "Subscriptions",
      link: "/subscriptions",
    },
    {
      icon: <MdOutlineVideoLibrary />,
      title: "Library",
      link: "/library",
    },
    {
      icon: <AiOutlineHistory />,
      title: "History",
      link: "/history",
    },
    {
      icon: <AiOutlineVideoCamera />,
      title: "Your videos",
      link: `/profile/${session?.user?.doc._id}`,
    },
    {
      icon: <AiOutlineFieldTime />,
      title: "Watch later",
      link: "/",
    },
    {
      icon: <AiOutlineLike />,
      title: "Liked videos",
      link: "/liked_videos",
    },
  ];

  useEffect(() => {
    pathname.startsWith("/video/") ? setHide(false) : setHide(true);
  }, [pathname]);

  return (
    <div
      className={clsx(
        "hidden sm:block w-8 md:w-10 lg:w-60",
        !hide && "sm:hidden"
      )}
    >
      <div className="fixed top-16 left-0 z-40 px-3 w-[4.5rem] lg:w-60 h-screen bg-[#0f0f0f]">
        <ul className="pb-3">
          {list.map((item, index) => (
            <li key={index}>
              <Link
                href={`${item.link}`}
                className="flex gap-5 items-center py-2 pl-0 md:pl-3 hover:bg-[#272727] rounded-md"
              >
                <div className="text-2xl">{item.icon}</div>
                <h4 className="text-sm font-normal text-white hidden lg:block">
                  {item.title}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        {!session && (
          <div className="ml-3 mt-3">
            <p className="text-sm text-white font-normal leading-6 mb-3">
              Sign in to like videos, comment, and subscribe.
            </p>
            <Link
              href="/sign"
              className="flex gap-1 items-center text-sky-500 text-lg font-semibold rounded-full border border-sky-500 py-1 px-5"
            >
              <div className="text-2xl">
                <RxAvatar />
              </div>
              Sign in
            </Link>
          </div>
        )}
        {/* Mobile Menu Left */}
      </div>
    </div>
  );
}

export default HomeSideBar;
