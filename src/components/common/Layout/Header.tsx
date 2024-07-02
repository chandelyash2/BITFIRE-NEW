"use client";
import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import Hamburger from "../../../../public/svg/Hamburger.svg";
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();
  return (
    <div className="h-[80px] flex items-center rounded-md shadow-custom bg-primary text-white mt-3">
      <div className="hidden lg:flex items-center justify-between w-full px-4 py-2">
        <Image src="/Logo.png" width={130} height={40} alt="logo" />
        <div className="flex gap-2 items-center">
          <h2 className="font-bold text-sm">Xda991</h2>
          <span className="rounded-full border p-1">
            <FaUserAstronaut />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2 lg:hidden">
        <Image src={Hamburger} alt="Hamburger" ref={btnRef} onClick={onOpen} />
        <Image src="/Logo.png" width={80} height={30} alt="logo" />
        <div className="flex gap-2 items-center">
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
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
