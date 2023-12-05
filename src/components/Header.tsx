"use client";
import React from "react";
import IconButton from "./IconButton";
import { FiCopy } from "react-icons/fi";


export default function Header({ state }: any) {
  return (
    <div className="p-6 absolute top-0 w-full bg-yellow">
      <div className="flex justify-between items-center">
        <span>Logo</span>
        <h1 className="text-2xl">
          Welcome <span className="font-bold text-3xl"> [{state.name}]</span>
        </h1>
        <div className="flex gap-4 items-center">
          <p className="w-36 truncate overflow-hidden">
            {state.userWeb5data.did}
          </p>
          <IconButton
            handleClick={() => {
              ("");
            }}
          >
            <FiCopy size={20} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
