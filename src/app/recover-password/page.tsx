"use client";

import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import Spinner from "@/components/Spinner";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useWeb5 } from "@/hooks/useWeb5";
import useUserInfo from "@/hooks/useUserInfo";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  let { web5, userDid, isLoading } = useWeb5();
  let { updateUserData, userData } = useUserInfo(web5);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [did, setDid] = useState("");

  if (isLoading) {
    return (
      <div className="bg-black h-screen flex-col flex items-center justify-center">
        <Spinner />
        <p className="text-yellow font-italic mt-2 font-medium">
          App Initializing ...
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userDid === did) {
      setNewPassword(true);
    } else {
      setError("Invalid Credentials");
    }
  };
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    updateUserData(userData[0].id, {
      ...userData[0]?.data,
      password: password,
    });
    setLoading(false);
    Swal.fire({
      title: "Password Reset Successful!",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "Continue to login",
      confirmButtonColor: "hsl(38, 94%, 49%)",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDid(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-black flex-col items-center justify-center">
       <div className="absolute left-10 top-10">
        <Link href="/">
          <Image
                src="/logo-white.svg"
            alt="logo"
            height={100}
            width={100}
            className="w-36"
          />
        </Link>
      </div>
      {newPassword ? (
        <form className="" onSubmit={(e) => handleResetPassword(e)}>
          <div className="relative">
            <input
              onChange={(e) => handlePasswordChange(e)}
              type="text"
              value={password}
              min="4"
              className={`p-4 rounded-lg text-black w-2/6 min-w-[300px]`}
              placeholder="New Password"
              required
            />
          </div>

          <div className="text-center mt-10 w-40 mx-auto">
            <button
              type={"submit"}
              className={`${
                error.length > 0 ? "border-[1px] border-error" : "border-none"
              } p-4 font-bold text-white rounded-lg w-full h-12 bg-yellow flex flex-col items-center justify-center`}
            >
              {loading ? <Spinner /> : "New Password"}
            </button>
          </div>
        </form>
      ) : (
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <div className="relative">
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              value={did}
              className="p-4 block mb-6 rounded-lg text-black w-2/6 min-w-[300px]"
              placeholder="DID"
              required
            />
            {error.length > 0 ? (
              <p className="text-sm absolute -bottom-6 text-error flex items-center gap-1">
                <MdErrorOutline size={20} />
                {error}
              </p>
            ) : null}
          </div>

          <div className="text-center mt-10 w-40 mx-auto">
            <button
              type={"submit"}
              className="p-4 font-bold text-white rounded-lg w-full h-12 bg-yellow flex flex-col items-center justify-center"
            >
              Confirm DID
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
