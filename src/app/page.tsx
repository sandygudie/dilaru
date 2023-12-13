"use client";

import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context";
import { useWeb5 } from "@/hooks/useWeb5";
import Spinner from "@/components/Spinner";

import { MdErrorOutline } from "react-icons/md";

export default function Login() {
  let { web5, userDid, isLoading } = useWeb5();
  const router = useRouter();
  const { getUserWeb5Data, setName, state } = useContext(AppContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setAuthenticated] = useState<boolean>();

  useEffect(() => {
    const getUser = localStorage.getItem("userId");
    if (getUser === null) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, []);
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
    setLoading(true);
    try {
      const userWeb5data = {
        web5,
        userDid,
      };
      getUserWeb5Data({ userWeb5data });
      setName({ name: userName });
      localStorage.setItem("userId", "Dilaru_id");

      const { record }: any = await web5?.dwn.records.create({
        data: {
          username: userName,
          password: password,
        },
        message: {
          schema: "http://schema-registry.org/message",
          dataFormat: "application/json",
        },
      });
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error("Error initializing Web5:", error);
    }
  };
  const handleAuthenticatedUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (web5 !== null) {
    const { records }: any = await web5?.dwn.records.query({
      message: {
        filter: {
          schema: "http://schema-registry.org/message",
          dataFormat: "application/json",
        },
      },
    });
    const userData = [];
    for (let record of records) {
      const data = await record.data.json();
      const dataRecord = { record, data, id: record.id };
      userData.push(dataRecord);
    }
    console.log(userData);

    if (userData[0].data.password === password) {
      const userWeb5data = {
        web5,
        userDid,
      };
      getUserWeb5Data({ userWeb5data });
      setName({ name: userData[0].data.username });
      router.push("/dashboard");
    } else {
      setError("Invalid Credential");
    }
    // }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(e.target.value);
  };

  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-center">
      {isAuthenticated === false ? (
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            className="p-4 block mb-6 rounded-lg text-black w-2/6 min-w-[300px]"
            placeholder="Name"
            required
          />
          <input
            onChange={(e) => handlePasswordChange(e)}
            type="password"
            className="p-4 rounded-lg text-black w-2/6 min-w-[300px]"
            placeholder="PIN"
            required
          />
          <p className="text-xs mt-2 text-white">
            (*Your pin is important for account recovery)
          </p>
          <div className="text-center w-40 mx-auto">
            <button
              type={"submit"}
              className="p-4 font-bold text-white rounded-lg w-full h-12 my-8 bg-yellow flex flex-col items-center justify-center"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
      ) : isAuthenticated === true ? (
        <div className="text-center">
          <form className="" onSubmit={(e) => handleAuthenticatedUser(e)}>
            <div className="relative">
              <input
                onChange={(e) => handlePasswordChange(e)}
                type="password"
                className={`${
                  error.length > 0 ? "border-[1px] border-error" : "border-none"
                } p-4 rounded-lg text-black w-2/6 min-w-[300px]`}
                placeholder="PIN"
                required
              />
              {error.length ? (
                <p className="text-sm absolute -bottom-6 text-error flex items-center gap-1">
                  <MdErrorOutline size={20} />
                  {error}
                </p>
              ) : null}
            </div>
            <div className="text-center my-10 w-40 mx-auto">
              <button
                type={"submit"}
                className="p-4 font-bold text-white rounded-lg w-full h-12  bg-yellow flex flex-col items-center justify-center"
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
