"use client";

import { Layout } from "@/components/common/Layout";
import {
  useGetIndividualStatementQuery,
  User,
} from "@/graphql/generated/schema";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const StatementPage = () => {
  const [authUser, setAuthUser] = useState<User | null>();
  useEffect(() => {
    const encryptedData = sessionStorage.getItem("userData");
    if (encryptedData) {
      // const decryptedData = decryptData(encryptedData);
      const userData = JSON.parse(encryptedData);
      setAuthUser(userData);
    }
  }, []);
  const { data, loading } = useGetIndividualStatementQuery({
    variables: {
      limit: 10,
      offset: 0,
      userId: authUser?._id || "",
      from: "2024-10-14",
      to: "2024-10-16",
    },
  });
  const statement = data?.getIndividualStatement?.transactions;

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold">
          <h2 className="flex gap-2 items-center">
            <MdHistory />
            Tranfer Statement
          </h2>
        </div>

        {statement?.map((item) => (
          <div
            className="flex gap-3 border-b border-text text-text pb-4 flex-wrap justify-between items-center text-center"
            key={item?._id}
          >
            <h2>{item?.debitAmount ? "Withdrawal" : "Deposit"}</h2>

            <h2> {moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}</h2>
            <h2
              className={twMerge("font-bold",
                item?.debitAmount ? "text-red-500" : "text-secondary"
              )}
            >
              {item?.debitAmount ? item.debitAmount : item?.creditAmount}
            </h2>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default StatementPage;
