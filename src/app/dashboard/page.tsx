
"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useContext } from "react";
import { AppContext } from "@/context";
// import { useRouter } from 'next/navigation'
import Profile from "@/components/Profile";


export default function Dashboard() {
  const { state } = useContext(AppContext);
  // const router = useRouter();
  if (!(state.userWeb5data.did && state.userWeb5data.web5)) {
    // return router.push("/");
  }
  return (
    <div className="flex bg-white items-start relative">
      <Sidebar />
      <Header state={state} />
      <Profile/>
    </div>
  );
}