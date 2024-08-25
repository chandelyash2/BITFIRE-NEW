import { MdAccountBalance } from "react-icons/md";
import Top from "../../../../public/svg/Top.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { inPlaySports } from "@/components/InPlay";
import { useContext } from "react";
import { CMSModal } from "@/context";

const Sidebar = () => {
  const { activeSport, setActiveSport, setSelectedBetData } =
    useContext(CMSModal);
  const router = useRouter();

  return (
    <div className="fixed h-[700px] overflow-auto">
      <div className="bg-highlight text-white/50 h-12 w-44 rounded-md flex gap-3 items-center px-2">
        <MdAccountBalance /> Settle Bets
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h2 className="flex gap-2 items-center text-secondary">
          <Image src={Top} alt="Top" /> Top Sports
        </h2>
        {inPlaySports.map((items) => (
          <div
            className={twMerge(
              "bg-highlight text-white/50 h-12 w-44 rounded-md flex gap-3 flex items-center px-2 cursor-pointer",
              activeSport.id === items.id && "text-secondary bg-primary"
            )}
            key={items.name}
            onClick={() => {
              setSelectedBetData({});
              router.push("/");
              setActiveSport(items);
            }}
          >
            {items.icon} {items.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
