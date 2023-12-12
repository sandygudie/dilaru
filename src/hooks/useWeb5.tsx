import { useState, useEffect } from "react";
import { Web5 } from "@web5/api";

export function useWeb5() {
  const [web5, setWeb5] = useState<Web5>();
  const [userDid, setdUserDid] = useState("");

  // useEffect(() => {
  //   async function initialize() {
  //     try {
  //       const { web5, did } = await Web5.connect();
  //       setWeb5(web5);
  //       setdUserDid(did);
  //     } catch (error) {
  //       console.error("Error initializing Web5:", error);
  //     }
  //   }
  //   initialize();
  // }, []);
  useEffect(() => {
    const initWeb5 = async () => {
      // @ts-ignore
      const { Web5 } = await import("@web5/api/browser");
      try {
        const { web5, did } = await Web5.connect({ sync: "5s" });

        setWeb5(web5);
        setdUserDid(did);

        if (web5 && did) {
          console.log("Web5 initialized");
        }
      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    };

    initWeb5();
  }, []);

  return { web5, userDid };
}
