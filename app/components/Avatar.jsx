import React from "react";
import Image from "next/image";
import avatarImg from "@/public/avatar.jpg";

function Avatar({ img, alt, height, width, classList }) {
  return (
    <Image
      src={img ? img : avatarImg}
      alt={alt}
      height={height}
      width={width}
      className={classList}
    />
  );
}

export default Avatar;
