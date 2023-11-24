"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import profileImg from "../../../public/profile.jpg";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { useSession, signOut } from "next-auth/react";
import { videosData } from "@/redux/features/videos/videoSlice";
import Avatar from "../Avatar";

function ProfileMenu({ dropDownRef }) {
  const { user } = useSelector(videosData);
  const { data: session } = useSession();

  const router = useRouter();
  const signOutt = () => {
    router.push("/");
    signOut({ callbackUrl: process.env.DOMAIN });
  };
  return (
    <div className="bg-[#282828] rounded-lg">
      <div>
        <div className="flex gap-3 p-3">
          <Avatar
            img={user?.img}
            alt={user?.name}
            width={50}
            height={50}
            classList="w-[50px] h-[50px] object-cover rounded-full"
          />

          <div>
            <h1 className="text-base font-semibold text-white mb-1">
              {user ? user.name : session?.user?.name}
            </h1>
            <p className="text-sm font-semibold text-white">
              {user ? user.email : session?.user?.email}
            </p>
          </div>
        </div>
        <hr />
        <ul className="py-3 flex flex-col gap-1">
          <li>
            <Link
              href={`/profile/${user ? user._id : session?.user?.doc._id}`}
              // onClick={() => showProfileMenu(false)}
              className="flex gap-2 items-center hover:bg-[#3e3e3e] px-3 py-2"
            >
              <CgProfile style={{ fontSize: "20px" }} />
              <span className="text-base font-semibold text-white">
                Your channel
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex gap-2 items-center hover:bg-[#3e3e3e] px-3 py-2"
              onClick={signOutt}
            >
              <GoSignOut style={{ fontSize: "20px" }} />
              <span className="text-base font-semibold text-white">
                Sign out
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileMenu;
