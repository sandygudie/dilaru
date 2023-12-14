import React from "react";
import { FcSimCardChip } from "react-icons/fc";

interface IProfileProps {
  profile: any;
}
export default function NinCard({ profile }: IProfileProps) {
  return (
    <div className="hidden md:block w-96 shadow-2xl px-10 pt-10 pb-6 text-black ">
      <h3 className="font-bold text-xl"> {profile.cardType}</h3>
     <div className="mt-4 flex gap-8 items-center justify-between">
     <div>
        <FcSimCardChip size={50} />
      </div>
      <div className="flex flex-wrap gap-6 items-start">
        <div>
          <p className="font-semibold">Surname</p>
          <p className="text-sm">{profile.surname}</p>
        </div>
        <div>
          <p className="font-semibold">First name</p>
          <p className="text-sm">{profile.firstname}</p>
        </div>
        <div>
          <p className="font-semibold">Middle name</p>
          <p className="text-sm">{profile.middlename}</p>
        </div>
        <div>
          <p className="font-semibold">Gender</p>
          <p className="text-sm">{profile.gender}</p>
        </div>
      </div>
     </div>
     <div className="text-center text-xs mt-6">
        <button>View card details</button>
     </div>
    </div>
  );
}
