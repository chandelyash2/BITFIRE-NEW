import Image from "next/image";
import { MdAccountBalance } from "react-icons/md";
import Top from "../../../../public/svg/Top.svg";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { inPlaySports } from "@/components/InPlay";
import { useContext } from "react";
import { CMSModal } from "@/context";
import { useRouter } from "next/navigation";

export const SidebarMob = ({ onClose }: { onClose: () => any }) => {
  const { activeSport, setActiveSport, setSelectedBetData } =
    useContext(CMSModal);
  const router = useRouter();

  return (
    <div className="px-6 py-5">
      <Link href="/">
        <Image src="/Logo.png" width={100} height={30} alt="logo" />
      </Link>
      <div className="text-white/50 h-12 w-44 rounded-md flex gap-3 items-center px-2 mt-20">
        <MdAccountBalance /> Settle Bets
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h2 className="flex gap-2 items-center text-secondary bg-highlight p-2 rounded-md">
          <Image src={Top} alt="Top" /> Top Sports
        </h2>
        {inPlaySports.map((items) => (
          <div
            className={twMerge(
              "text-white/50 h-12 w-44 rounded-md flex gap-3 flex items-center px-2",
              activeSport.id === items.id && "text-secondary"
            )}
            key={items.name}
            onClick={() => {
              setSelectedBetData({});
              router.push("/");
              setActiveSport(items);
              onClose();
            }}
          >
            {items.icon} {items.name}
          </div>
        ))}
      </div>
    </div>
  );
};
