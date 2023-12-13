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
    <div className="h-full mx-8 md:mx-12 mt-36">
      {Object.keys(state.profile).length ? (
        <NinCard profile={state.profile} />
      ) : (
        <div className="flex items-center text-black h-full justify-center flex-col">
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer flex items-center shadow-lg p-6 md:py-8 md:px-10 border-[1px] flex-col justify-center"
          >
            <IoAddCircleOutline color="black" className="text-4xl" />

            <p className="text-sm md:text-base">Add NIN Data</p>
          </button>
        </div>
      )}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <NinForm handleNinForm={handleNinForm} />
      </Modal>
    </div>
  );
}
