"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useContext } from "react";
import { AppContext } from "@/context";
import { useRouter } from "next/navigation";

interface ChildrenProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: ChildrenProps) {
  const { state } = useContext(AppContext);
  const router = useRouter();
  if (!(state.userWeb5data.did && state.userWeb5data.web5)) {
    return router.push("/");
  }
  return (
    <div className="flex bg-white items-start relative">
      <Sidebar />
      <Header state={state} />
      <div className="pt-36 w-full h-screen px-24">{children}</div>
    </div>
  );
}
