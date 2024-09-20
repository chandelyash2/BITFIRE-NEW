import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-auto min-h-[80px] p-4 w-full left-0 z-[999] flex flex-col lg:flex-row gap-2 items-center rounded-md shadow-custom bg-primary text-white justify-between">
      <p className="text-xs flex items-center gap-2">
        <Link href="https://www.gamblingtherapy.org/" className="flex justify-center items-center border w-8 h-8 rounded-full">
    gt
        </Link>
      </p>

      <p className="text-xs">
        © Copyright 2024. All Rights Reserved. Powered by{" "}
        <span className="text-secondary font-bold">Betfair</span>.
      </p>
      <p className="text-xs flex items-center gap-2">
        <span className="flex justify-center items-center border w-8 h-8 rounded-full">
          18+
        </span>
        Underage gambling is an offence
      </p>
    </div>
  );
};

export default Footer;
