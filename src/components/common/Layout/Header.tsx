"use client";
import {
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
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onOpen: onProfileOpen,
    isOpen: isProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const btnRef: any = React.useRef();
  const profileRef: any = React.useRef();
  return (
    <div className="h-[80px] flex items-center rounded-md shadow-custom bg-primary text-white mt-3">
      <div className="hidden lg:flex items-center justify-between w-full px-4 py-2">
        <Link href="/">
          <Image src="/Logo.png" width={130} height={40} alt="logo" />
        </Link>
        <div
          className="flex gap-2 items-center"
          ref={profileRef}
          onClick={onProfileOpen}
        >
          <h2 className="font-bold text-sm">Xda991</h2>
          <span className="rounded-full border p-1">
            <FaUserAstronaut />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2 lg:hidden">
        <Image src={Hamburger} alt="Hamburger" ref={btnRef} onClick={onOpen} />
        <Link href="/">
          <Image src="/Logo.png" width={80} height={30} alt="logo" />
        </Link>
        <div
          className="flex gap-2 items-center"
          ref={profileRef}
          onClick={onProfileOpen}
        >
          <span className="rounded-full border p-1">
            <FaUserAstronaut />
          </span>
        </div>
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
          <ProfileNav />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
