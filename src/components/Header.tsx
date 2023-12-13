"use client";
import React, { useState } from "react";
import IconButton from "./IconButton";
import { FiCopy } from "react-icons/fi";

export default function Header({ state }: any) {
  const [isCopy, setCopy] = useState("");

  async function copyTextToClipboard() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(state.userWeb5data.userDid);
        setCopy(state.userWeb5data.userDid);
      }
    } catch (err) {
      return err;
    }
  }
  return (
    <div className="p-6 absolute top-0 w-full bg-yellow">
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">DILARU-ID</span>
        <h1 className="text-2xl">
          Welcome <span className="font-bold text-3xl"> {state.name}</span>
        </h1>
        <div className="flex gap-2 items-center">
          <p className="w-36 truncate overflow-hidden">
            {state.userWeb5data.userDid}
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
