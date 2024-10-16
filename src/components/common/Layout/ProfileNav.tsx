import { IoLockClosed } from "react-icons/io5";
import { FaEdit, FaHistory, FaUserAstronaut } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { ProfileProp } from "@/components/Event";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { StakeValue } from "../StakeValue";
import Link from "next/link";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { ChangePassword } from "../ChangePassword";
import { twMerge } from "tailwind-merge";
export const list = [
  {
    name: "Settled Bets",
    icon: <IoLockClosed />,
    href: "/settled",
  },
  {
    name: "Betting P&L",
    icon: <FaMoneyBillTransfer />,
    href: "/p&l",
  },
  {
    name: "Transaction History",
    icon: <FaHistory />,
    href: "/statement",
  },
];
export const ProfileNav = ({ authUser, onProfileClose }: ProfileProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isChangeOpen,
    onOpen: onChangeOpen,
    onClose: onChangeClose,
  } = useDisclosure();

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
            Available Credit:
            <span className="font-bold">{authUser?.availableCredit}</span>
          </h2>
          <h2 className="bg-[#1C1E21] p-2 rounded-md">
            Exposure:
            <span className="font-bold text-red-500">{authUser?.exposure}</span>
          </h2>
          <h2 className="bg-[#1C1E21] p-2 rounded-md">
            Credit Limit:
            <span className="font-bold">{authUser?.creditLimit}</span>
          </h2>
          <h2 className="bg-[#1C1E21] p-2 rounded-md">
            Winning:
            <span
              className={twMerge(
                "font-bold",
                authUser.winning && authUser?.winning > 0
                  ? "text-secondary"
                  : "text-red-500"
              )}
            >
              {authUser?.winning}
            </span>
          </h2>
        </div>

        {list.map((item) => (
          <Link
            className="flex gap-2 items-center cursor-pointer"
            key={item.name}
            href={item.href}
            onClick={onProfileClose}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
        <h2 className="flex gap-2 items-center cursor-pointer" onClick={onOpen}>
          <FaEdit />
          Edit Stake Values
        </h2>
        <h2
          className="flex gap-2 items-center cursor-pointer"
          onClick={onChangeOpen}
        >
          <MdPassword />
          Change Password
        </h2>

        <h2
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("jwt-token");
            location.reload();
          }}
        >
          <LuLogOut />
          Logout
        </h2>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Stake</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StakeValue user={authUser} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isChangeOpen} onClose={onChangeClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangePassword user={authUser} onClose={onChangeClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
