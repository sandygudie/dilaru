"use client";

import { useState, useEffect } from "react";

export default function useUserInfo(web5: any) {
  const [userData, setUserData] = useState<
    { record: any; data: any; id: any }[]
  >([]);

  useEffect(() => {
    if (!web5) return;
    const fetchUser = async () => {
      try {
        const { records }: any = await web5?.dwn.records.query({
          message: {
            filter: {
              schema: "http://schema-registry.org/message",
              dataFormat: "application/json",
            },
          },
        });
        const mappedData = [];
        for (let record of records) {
          const data = await record.data.json();
          const dataRecord = { record, data, id: record.id };
          mappedData.push(dataRecord);
        }
        setUserData(mappedData);
      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    };
    fetchUser();
  }, [web5]);

  async function createUserData(data: any) {
    const { record }: any = await web5?.dwn.records.create({
      data: data,
      message: {
        schema: "http://schema-registry.org/message",
        dataFormat: "application/json",
      },
    });
  }
  async function updateUserData(id: string, updatedData: any) {
    const { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: id,
        },
      },
    });
    await record.update({ data: updatedData });
  }
  console.log(userData);

  return { userData, updateUserData, createUserData };
}
