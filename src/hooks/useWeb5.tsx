"use client";

import { useState, useEffect } from 'react';
import { Web5 } from "@web5/api";

export function useWeb5() {
    const [web5, setWeb5] = useState<Web5>();
    const [userDid, setdUserDid] = useState("");

  useEffect(() => {
    async function initialize() {
      try {
        const { web5, did } = await Web5.connect();
        // console.log("Web5 initialized successfully", web5, did);
        setWeb5(web5);
        setdUserDid(did);
      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    }
    initialize();
  }, []);

  return { web5, userDid};
}
