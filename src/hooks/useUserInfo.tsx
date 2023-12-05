"use client";

import { useState, useEffect } from "react";

export default function useUserInfo(web5: any) {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (!web5) return;
    const getUserInfo = async () => {
      try {
        const response: any = await web5.dwn.records.query({
          message: {
            filter: {
              schema: "http://schema-registry.org/message",
            },
          },
        });

        response.records.forEach(
          async (record: { data: { json: () => any } }) => {
            let username = await record.data.json();
            setUserData(username);
          }
        );

      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    };
    getUserInfo();
  }, [web5]);

  return { userData };
}
