import React from "react";

import { CgProfile } from "react-icons/cg";
import { BsRobot } from "react-icons/bs";
import Link from "next/link";

export default function Sidebar() {
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

  return (
    <div className="bg-black text-white h-screen w-[230px] py-28 px-6">
      {sidebarItems.map((ele) => {
        return (
          <Link
            href={ele.link}
            className="flex gap-4 my-8 items-center group"
            key={ele.id}
          >
            <span className="text-xl text-gray-200 group-hover:text-yellow">{ele.icon}</span>
            <p className="text-sm group-hover:text-yellow">{ele.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
