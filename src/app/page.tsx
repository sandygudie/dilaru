"use client";

import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context";
import { useWeb5 } from "@/hooks/useWeb5";
import Spinner from "@/components/Spinner";

export default function Login() {
  let { web5, userDid } = useWeb5();
  const router = useRouter();
  const { getUserWeb5Data, setName } = useContext(AppContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [web5, userDid]);

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
      // const { record } = await web5.dwn.records.create({
      //   data: name,
      //   message: {
      //     schema: "http://schema-registry.org/message",
      //     dataFormat: "application/json",
      //   },
      // });

      // if (record) {
      // }
      // console.log(userName);
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error("Error initializing Web5:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-center">
      {userDid ? (
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
      ) : (
        <div className="text-center">
          <Spinner />
          <p className="text-white text-xl mt-2">Retriving data ...</p>
        </div>
      )}
    </main>
  );
}
