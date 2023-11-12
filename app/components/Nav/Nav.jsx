"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BiBell, BiVideoPlus } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import logo from "../../../public/logo.png";
import profileImg from "../../../public/profile.jpg";
import styles from "./Nav.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import useDropdownPopupControl from "../../../hooks/useDropdownPopupControl";
import { useRouter } from "next/navigation";
import makeSlug from "@/utils/makeSlug";

function Nav() {
  const { data: session } = useSession();
  const [search, setSearch] = useState();
  const router = useRouter();

  const { open, toggleMenu, dropDownRef } = useDropdownPopupControl();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const makeSearchSlug = makeSlug(search);
    if (makeSearchSlug) {
      router.push(`/search/${makeSearchSlug}`);
    }
  };
  return (
    <div className={styles.nav}>
      <div className="flex items-center gap-1 md:gap-2 lg:gap-5">
        <div className="hidden sm:block text-2xl text-white cursor-pointer">
          <AiOutlineMenu />
        </div>
        <Link href="/" className="flex items-center">
          <div className="w-[30px] sm:w-[40px]">
            <Image src={logo} alt="YouTube Logo" width={40} height={40} />
          </div>
          <h1 className="text-1xl sm:text-2xl font-bold text-white">SaiTube</h1>
        </Link>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-end sm:justify-center"
        >
          <div className="sm:hidden text-2xl text-[#aaa] mr-3">
            <AiOutlineSearch />
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            id="search"
            type="text"
            placeholder="Search"
            className="hidden sm:block bg-[var(--search-box-background)] text-[hsla(0, 100%, 100%, 0.88)] placeholder:text-[hsl(0, 0%, 18.82%)] py-1 px-3 text-lg rounded-l-full rounded-r-full md:rounded-r-none w-[95%] md:w-[60%]"
          />
          <label
            onClick={handleSearch}
            htmlFor="search"
            className="hidden md:block text-2xl text-white py-2 px-5 bg-[#222222] rounded-r-full cursor-pointer"
          >
            <AiOutlineSearch />
          </label>
        </form>
      </div>
      <div className={styles.right}>
        {session ? (
          <div className="flex gap-5 items-center">
            <Link
              href="/upload"
              className="text-3xl text-white cursor-pointer hidden sm:block"
            >
              <BiVideoPlus />
            </Link>
            <div className="text-3xl text-white cursor-pointer hidden sm:block">
              <BiBell />
            </div>
            <div
              onClick={toggleMenu}
              ref={dropDownRef}
              className="w-[40px] cursor-pointer rounded-full"
            >
              <Image
                src={profileImg}
                alt="Sairaj Aftab"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        ) : (
          <Link
            href="/sign"
            className="w-16 md:w-28 flex gap-1 justify-center items-center text-sky-500 text-sm font-semibold rounded-full border border-sky-500 py-1"
          >
            <div className="text-2xl hidden md:block">
              <RxAvatar />
            </div>
            <span>Sign in</span>
          </Link>
        )}
      </div>
      {open && (
        <div className="absolute top-3 right-20 z-[999999999999] w-auto">
          <ProfileMenu dropDownRef={dropDownRef} />
        </div>
      )}
    </div>
  );
}

export default Nav;
