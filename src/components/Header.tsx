"use client";
import React, { useState } from "react";
import IconButton from "./IconButton";
import { FiCopy } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userData: any;
}
export default function Header({ userData }: Props) {
  const [isCopy, setCopy] = useState("");

  async function copyTextToClipboard() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(userData[0]?.record.author);
        setCopy(userData[0]?.record.author);
      }
    } catch (err) {
      return err;
    }
  }
  return (
    <div className="p-4 md:p-6 absolute top-0 w-full bg-yellow">
      <div className="flex justify-between items-center">
        <span className="font-bold w-36">
          <Link href="/dashboard">
            <Image
              src="/logo-black.png"
              alt="logo"
              height={100}
              width={100}
              className="w-36 h-auto"
            />
          </Link>
        </span>
        <h1 className="text-right text-2xl">
          Welcome{" "}
          <span className="font-bold text-lg md:text-3xl">
            {" "}
            {userData[0]?.data.username}
          </span>
        </h1>
        <div className="hidden md:flex gap-2 items-center">
          <p className="w-36 truncate overflow-hidden">
            {userData[0]?.record.author}
          </p>
          <IconButton
            handleClick={() => {
              copyTextToClipboard();
            }}
          >
            <div className="flex items-center gap-2">
              {isCopy.length > 0 ? (
                <span className="text-sm text-green">Copied</span>
              ) : null}
              <FiCopy
                size={20}
                className={`${
                  isCopy.length > 0 ? "text-green" : "text-gray-300"
                }`}
              />
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
