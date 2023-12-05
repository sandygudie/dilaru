"use client";
import React, { useContext, useState } from "react";

import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "./Modal";
import NinForm from "./NinForm";
import { AppContext } from "@/context";
import NinCard from "./NinCard";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const { setProfile, state } = useContext(AppContext);
  const handleNinForm = (formValue: any) => {
    const data = {
      ...formValue,
      cardType: "National Identity card (NIN)",
    };
    setProfile(data);
    setModalOpen(false);
  };
  return (
    <div className="h-full">
      {Object.keys(state.profile).length ? (
        <NinCard profile={state.profile} />
      ) : (
        <div className="flex items-center text-black h-full justify-center flex-col">
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer flex items-center shadow-lg py-8 px-10 border-[1px] flex-col justify-center"
          >
            <IoAddCircleOutline size={50} color="black" className="" />

            <p className="">Add NIN Data</p>
          </button>
        </div>
      )}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <NinForm handleNinForm={handleNinForm} />
      </Modal>
    </div>
  );
}
