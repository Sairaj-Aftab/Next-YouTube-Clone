import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import profileImg from "@/public/profile.jpg";
import { BiDislike, BiLike } from "react-icons/bi";

const demoText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae unde accusamus facere fuga atque soluta hic pariatur earum nisi. Saepe necessitatibus vero nemo provident eaque eum temporibus autem sapiente, quae molestias nam quas expedita, pariatur aliquam omnis unde, tenetur esse! Nostrum ipsum error, amet deleniti corrupti at, delectus vitae inventore doloribus rerum saepe modi quasi explicabo! Voluptatem aspernatur sed, aliquid cum dolores eaque quos incidunt quibusdam voluptates, iusto neque nam?";

function ProfileDescSection() {
  const [des, setDes] = useState(false);

  const handleShowMore = () => {
    setDes(true);
  };
  return (
    <>
      {/* Profile */}
      <div className="px-2 sm:px-0 sm:flex justify-between items-center">
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href={`/profile/fkjfksfj`}
            className="w-[50px] h-[50px] rounded-full"
          >
            <Image
              src={profileImg}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <div>
            <Link
              href={`/profile/fjkd4534`}
              className="text-base md:text-lg font-semibold text-white"
            >
              Sairaj Aftab
            </Link>
            <p className="text-sm font-normal text-[#aaa]">5.6k subscribers</p>
          </div>
          <button className="py-1 md:py-2 px-2 md:px-3 text-sm font-semibold text-[var(--base-background)] bg-white rounded-full ml-2 md:ml-5">
            Subscribe
          </button>
        </div>
        <div>
          <div className="w-28 md:w-auto mt-2 md:mt-auto flex py-1 md:py-2 px-2 md:px-3 bg-[#252637] rounded-full">
            <div className="flex gap-1 items-center border-r text-lg md:text-2xl pr-2 md:pr-5 cursor-pointer">
              <BiLike />
              <span className="text-sm font-semibold text-white">76</span>
            </div>
            <div className="flex gap-1 items-center text-lg md:text-2xl pl-2 md:pl-5 cursor-pointer">
              <span className="text-sm font-semibold text-white">02</span>
              <BiDislike />
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mx-2 sm:mx-0 bg-[#27272c] hover:bg-[#3e3e41] rounded-lg p-3 cursor-pointer text-white">
        <p className="text-base font-bold">5678 views 13 hours ago</p>
        <p className="text-base font-semibold" onClick={handleShowMore}>
          {des && demoText}
          {!des && demoText.length >= 250
            ? demoText.substring(0, 250)
            : demoText}
          {!des && demoText.length >= 250 && (
            <button className="text-base font-bold shadow-lg">Show more</button>
          )}
        </p>
        {des && (
          <button
            onClick={() => setDes(!des)}
            className="text-base font-bold shadow-lg block mt-10"
          >
            Show less
          </button>
        )}
      </div>
    </>
  );
}

export default ProfileDescSection;
