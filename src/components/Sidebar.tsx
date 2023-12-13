"use client";
import React from "react";

import { CgProfile } from "react-icons/cg";
import { BsRobot } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
export default function Sidebar() {
  const router = useRouter();
  const sidebarItems = [
    {
      id: 0,
      name: "Profile",
      icon: <CgProfile />,
      link: "/dashboard",
    },
    {
      id: 1,
      name: "Access Control",
      icon: <BsRobot />,
      link: "#",
    },
  ];
  const handleLogout = () => {
    router.push("/");
  };
  return (
    <div className="bg-black text-white h-screen md:w-[230px] relative py-28 px-4 md:px-6">
      {sidebarItems.map((ele) => {
        return (
          <Link
            href={ele.link}
            className="flex gap-4 my-8 items-center group"
            key={ele.id}
          >
            <span className="text-xl text-gray-200 group-hover:text-yellow">
              {ele.icon}
            </span>
            <p className="text-sm group-hover:text-yellow">{ele.name}</p>
          </Link>
        );
      })}
      <button
        onClick={() => {
          handleLogout();
        }}
        className="bg-yellow text-sm md:text-base absolute flex items-center gap-3 bottom-10 rounded-lg text-white font-medium py-2 px-4"
      >
        <CiLogout /> Logout
      </button>
    </div>
  );
}
