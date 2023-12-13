"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { Suspense, useContext, useEffect } from "react";
import { AppContext } from "@/context";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import Loading from "../loading";
import Spinner from "@/components/Spinner";

export default function Dashboard() {
  const { state } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!state.userWeb5data.userDid.length) {
      router.push("/");
    }
  }, [state.userWeb5data.userDid]);
  // console.log(state.userWeb5data.userDid);
  return (
    <>
      {state.userWeb5data.userDid ? (
        <div className="flex bg-white items-start relative">
          <Sidebar />
          <Header state={state} />
          {/* <Suspense fallback={<Loading />}> */}
          <Profile />
          {/* </Suspense> */}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
