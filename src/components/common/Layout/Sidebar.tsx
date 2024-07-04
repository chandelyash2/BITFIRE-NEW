import { MdAccountBalance } from "react-icons/md";
import Top from "../../../../public/svg/Top.svg";
import Image from "next/image";
import { SiAirplayaudio } from "react-icons/si";
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";
import { MdOutlineSportsCricket } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const sideBarList = [
  {
    name: "In Play",
    icon: <SiAirplayaudio />,
    url: "/",
  },
  {
    name: "Football",
    icon: <IoFootballOutline />,
    url: "/sport/football",
  },
  {
    name: "Cricket",
    icon: <MdOutlineSportsCricket />,
    url: "/sport/cricket",
  },
  {
    name: "Tennis",
    icon: <IoTennisballOutline />,
    url: "/sport/tennis",
  },
];

const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="fixed">
      <div className="bg-highlight text-white/50 h-12 w-44 rounded-md flex gap-3 items-center px-2">
        <MdAccountBalance /> Settle Bets
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h2 className="flex gap-2 items-center text-secondary">
          <Image src={Top} alt="Top" /> Top Sports
        </h2>
        {sideBarList.map((items) => (
          <Link
            className={twMerge(
              "bg-highlight text-white/50 h-12 w-44 rounded-md flex gap-3 flex items-center px-2",
              path === items.url && "text-secondary bg-primary"
            )}
            key={items.name}
            href={items.url}
          >
            {items.icon} {items.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
