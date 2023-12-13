import { Web5 } from "@web5/api";
import { useState, useEffect } from "react";


export function useWeb5() {
  const [web5, setWeb5] = useState<Web5|null>(null);
  const [userDid, setUserDid] = useState("");
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true)
    const initWeb5 = async () => {
 
      // @ts-ignore
      const { Web5 } = await import("@web5/api");
      try {
        const { web5, did } = await Web5.connect();
        setWeb5(web5);
        setUserDid(did);
        if (web5 && did) {
          setLoading(false)
          console.log("Web5 initialized");
        }
      } catch (error) {
        setLoading(false)
        console.error("Error initializing Web5:", error);
      }
    };

    initWeb5();
  }, []);

  return { web5, userDid ,isLoading};
}
