"use client";
import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import Hamburger from "../../../../public/svg/Hamburger.svg";
import Link from "next/link";
import { SidebarMob } from "./SidebarMob";
import { ProfileNav } from "./ProfileNav";
import { ProfileProp } from "@/components/Event";
import { useRouter } from "next/navigation";
const Header = ({ authUser }: ProfileProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onOpen: onProfileOpen,
    isOpen: isProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const btnRef: any = React.useRef();
  const profileRef: any = React.useRef();
  const router = useRouter();

  return (
    <div className="h-[80px] flex items-center rounded-md shadow-custom bg-primary text-white mt-3">
      <div className="hidden lg:flex items-center justify-between w-full px-4 py-2">
        <Link href="/">
          <Image src="/Logo.png" width={130} height={40} alt="logo" />
        </Link>
        {authUser?.userName ? (
          <div
            className="flex gap-2 items-center"
            ref={profileRef}
            onClick={onProfileOpen}
          >
            <h2 className="font-bold text-sm">{authUser.userName}</h2>
            <span className="rounded-full border p-1">
              <FaUserAstronaut />
            </span>
          </div>
        ) : (
          <Button colorScheme="blue" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2 lg:hidden">
        <Image src={Hamburger} alt="Hamburger" ref={btnRef} onClick={onOpen} />
        <Link href="/">
          <Image src="/Logo.png" width={80} height={30} alt="logo" />
        </Link>
        {authUser.userName ? (
          <div
            className="flex gap-2 items-center"
            ref={profileRef}
            onClick={onProfileOpen}
          >
            <span className="rounded-full border p-1">
              <FaUserAstronaut />
            </span>
          </div>
        ) : (
          <Button colorScheme="blue" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        colorScheme="teal"
      >
        <DrawerOverlay />
        <DrawerContent background="#141414">
          <DrawerCloseButton className="text-white mt-3" />
          <SidebarMob onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isProfileOpen}
        placement="right"
        onClose={onProfileClose}
        finalFocusRef={profileRef}
      >
        <DrawerOverlay />
        <DrawerContent background="#141414">
          <DrawerCloseButton className="text-white mt-2" />
          <ProfileNav authUser={authUser}/>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
