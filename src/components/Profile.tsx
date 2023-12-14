"use client";
import React, { useContext, useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "./Modal";
import NinForm from "./NinForm";
import { AppContext } from "@/context";
import NinCard from "./NinCard";

interface Props {
  userData: any;
  updateUserData: (id: string, {}) => void;
}
export default function Profile({ updateUserData, userData }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { setProfile, state } = useContext(AppContext);

  const handleNinForm = (formValue: any) => {
    const data = {
      ...formValue,
      cardType: "National Identity card (NIN)",
    };
    setProfile(data);
    setModalOpen(false);
    updateUserData(userData[0]?.id, {
      ...userData[0]?.data,
      verifiedCredential: [data],
    });
  };
  return (
    <div className="h-full mx-4 md:mx-12 mt-36">
      {userData[0]?.data.verifiedCredential?.length ||
      Object.keys(state.profile).length ? (
        <div>
          <div className="mb-6 flex-col-reverse gap-y-4 md:gap-0 md:flex-row flex w-full items-center justify-between">
            <h2 className="font-bold text-lg ">Verified Credentials</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="cursor-pointer flex items-center shadow-xl p-4 border-[1px] flex-col justify-center"
            >
              <IoAddCircleOutline color="black" className="text-4xl" />
              <p className="text-sm">Add Verified Credentials</p>
            </button>
          </div>

          <NinCard
            profile={
              userData[0]?.data.verifiedCredential?.length
                ? userData[0]?.data.verifiedCredential[0]
                : state.profile
            }
          />
        </div>
      ) : (
        <div className="flex items-center text-black h-[60vh] justify-center flex-col">
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer flex items-center shadow-xl hover:bg-yellow/10 bg-yellow/5 p-6 
             flex-col justify-center"
          >
            <IoAddCircleOutline color="black" className="text-4xl" />

            <p className="text-sm md:text-base">Add Verified Credentials</p>
          </button>
        </div>
      )}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <NinForm handleNinForm={handleNinForm} />
      </Modal>
    </div>
  );
}
