"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { Suspense, useContext, useEffect } from "react";
import { AppContext } from "@/context";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import Loading from "../loading";

export default function Dashboard() {
  const { state } = useContext(AppContext);
  // const router = useRouter();
// console.log(state)
  useEffect(() => {
    if (!(state.userWeb5data.userDid && state.userWeb5data.web5)) {
      window.location.assign("/");
    }
  }, [state.userWeb5data.userDid, state.userWeb5data.web5]);

  return (
    <div className="flex bg-white items-start relative">
      <Sidebar />
      <Header state={state} />
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    </div>
  );
}
