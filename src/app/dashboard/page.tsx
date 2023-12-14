"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import Loading from "../loading";
import { useWeb5 } from "@/hooks/useWeb5";
import useUserInfo from "@/hooks/useUserInfo";

export default function Dashboard() {
  let { web5, userDid } = useWeb5();
  let { userData, updateUserData } = useUserInfo(web5);
  const router = useRouter();

  useEffect(() => {
    const getUserStatus = localStorage.getItem("userstatus");
    if (getUserStatus === null) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      {userDid && userData ? (
        <div className="flex bg-white items-start relative">
          <Sidebar />
          <Header userData={userData} />
          <Profile updateUserData={updateUserData} userData={userData} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
