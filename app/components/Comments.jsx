import Image from "next/image";
import React from "react";
import profileImg from "@/public/profile.jpg";

const demoText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae unde accusamus facere fuga atque soluta hic pariatur earum nisi. Saepe necessitatibus vero nemo provident eaque eum temporibus autem sapiente, quae molestias nam quas expedita, pariatur aliquam omnis unde, tenetur esse! Nostrum ipsum error, amet deleniti corrupti at, delectus vitae inventore doloribus rerum saepe modi quasi explicabo! Voluptatem aspernatur sed, aliquid cum dolores eaque quos incidunt quibusdam voluptates, iusto neque nam?";

function Comments() {
  return (
    <div className="px-2 sm:px-0">
      <h1 className="text-2xl text-white font-extrabold">3,456 Comments</h1>
      <div className="flex gap-3 mt-5">
        <Image
          src={profileImg}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <input
          type="text"
          placeholder="Add a comment..."
          className="bg-transparent border-b w-full mb-3"
        />
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex gap-3 items-start">
          <Image
            src={profileImg}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <h3 className="text-sm font-extrabold text-white">
                Yeasir Mohammed
              </h3>
              <span className="text-sm font-semibold text-[#aaa]">
                2 years ago
              </span>
            </div>
            <p className="text-white text-sm font-bold">{demoText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
