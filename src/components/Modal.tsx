"use client";

import React, { useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}
const Modal = ({ open, setOpen, children }: ModalProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={`${
          open ? "bg-[#333333c2] z-60 " : "hidden "
        } fixed text-black h-screen flex justify-center bg-[#33333380] z-10 top-0 bottom-0 left-0 right-0`}
      >
        <div
          className={`${
            open === true
              ? "translate-y-px flex flex-col items-center duration-75"
              : "-translate-y-4/6"
          } w-full`}
        >
          <div onClick={() => setOpen(false)} className="cursor-pointer mb-6">
            <RiCloseCircleFill size={50} color="white" />
          </div>
          <div className="w-[50em] px-12 py-8 overflow-y-auto block bg-white min-h-[33em]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
