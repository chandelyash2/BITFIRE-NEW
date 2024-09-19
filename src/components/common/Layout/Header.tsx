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
import React, { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import Hamburger from "../../../../public/svg/Hamburger.svg";
import Link from "next/link";
import { SidebarMob } from "./SidebarMob";
import { ProfileNav } from "./ProfileNav";
import { ProfileProp } from "@/components/Event";
import { useRouter } from "next/navigation";
import { useMeQuery, User } from "@/graphql/generated/schema";
import { decryptData, encryptData } from "@/utils/crypto";
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authUser, setAuthUser] = useState<User>();
  const {
    onOpen: onProfileOpen,
    isOpen: isProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const btnRef: any = React.useRef();
  const profileRef: any = React.useRef();
  const router = useRouter();
  const { data, loading, refetch } = useMeQuery();

  useEffect(() => {
    const encryptedData = localStorage.getItem("userData");
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData);
      const userData = JSON.parse(decryptedData);
      setAuthUser(userData);
    }
  }, []);
  useEffect(() => {
    if (data?.me) {
      const encryptedData = encryptData(JSON.stringify(data?.me));
      localStorage.setItem("userData", encryptedData);
      setAuthUser(data?.me);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await refetch();
      const encryptedData = encryptData(JSON.stringify(data.data.me));
      localStorage.setItem("userData", encryptedData);
      data.data.me && setAuthUser(data.data.me);
    }, 4000);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  return (
    <div className="h-[80px] fixed top-0 w-full left-0 z-[999] flex items-center rounded-md shadow-custom bg-primary text-white">
      <div className="hidden lg:flex items-center justify-between w-full px-4 py-2">
        <Link href="/">
          <Image src="/Logo.png" width={130} height={40} alt="logo" />
        </Link>
        {authUser?.userName ? (
          <div className="flex gap-4 items-center">
            <div className="font-bold text-sm">
              <h2 className="text-secondary text-center">
                {authUser.availableCredit}
              </h2>
              <hr />
              <h2 className="text-red-500 text-center">{authUser.exposure}</h2>
            </div>
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
        {authUser?.userName ? (
          <div
            className="flex gap-2 items-center"
            ref={profileRef}
            onClick={onProfileOpen}
          >
            <div className=" font-bold text-xs">
              <h2 className="text-secondary text-center">
                {authUser?.availableCredit}
              </h2>
              <hr />
              <h2 className="text-red-500 text-center">{authUser?.exposure}</h2>
            </div>
            <h2 className="font-bold text-[10px]">{authUser?.userName}</h2>

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
          {authUser?._id && (
            <ProfileNav authUser={authUser} onProfileClose={onProfileClose} />
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
