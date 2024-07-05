import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import { CgLivePhoto } from "react-icons/cg";
import { FaHistory, FaUserAstronaut } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ProfileProp } from "@/components/Event";
export const list = [
  {
    name: "Bet Slip",
    icon: <IoDocumentTextOutline />,
    href: "",
  },
  {
    name: "Open Bets",
    icon: <CgLivePhoto />,
    href: "",
  },
  {
    name: "Account Settings",
    icon: <IoSettingsOutline />,
    href: "",
  },
  {
    name: "Transaction History",
    icon: <FaHistory />,
    href: "",
  },
];
export const ProfileNav = ({ authUser }: ProfileProp) => {
  const router = useRouter();
  return (
    <div className="text-text px-6 py-5">
      <div className="flex gap-2 items-center">
        <h2 className="font-bold text-sm">{authUser?.userName}</h2>
        <span className="rounded-full border p-1">
          <FaUserAstronaut />
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        <div className="bg-[#FFFFFF08] flex flex-col gap-1 p-4">
          <h2 className="bg-[#0078FF] p-2 rounded-md text-white">
            Available Credit:<span className="font-bold">{authUser?.availableCredit}</span>
          </h2>
          <h2 className="bg-[#1C1E21] p-2 rounded-md">
            Exposure:<span className="font-bold">{authUser?.exposure}</span>
          </h2>
          <h2 className="bg-[#1C1E21] p-2 rounded-md">
            Credit Limit:<span className="font-bold">{authUser?.creditLimit}</span>
          </h2>
        </div>

        {list.map((item) => (
          <h2 className="flex gap-2 items-center" key={item.name}>
            {item.icon}
            {item.name}
          </h2>
        ))}
        <h2
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            router.push("/login");
            Cookies.remove("jwt-token");
          }}
        >
          <LuLogOut />
          Logout
        </h2>
      </div>
    </div>
  );
};
