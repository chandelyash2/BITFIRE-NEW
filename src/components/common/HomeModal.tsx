import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChangePassword } from "./ChangePassword";
import { User } from "@/graphql/generated/schema";
import { useRouter } from "next/navigation";

const HomeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authUser, setAuthUSer] = useState<User | any>();
  const router =useRouter()
  useEffect(() => {
    let userData = null;
    const encryptedData: any = sessionStorage.getItem("userData");
    const parsedData = JSON.parse(encryptedData);
    userData = parsedData;
    setAuthUSer(userData);
  }, []);
  
  useEffect(() => {
    if (authUser?.loginStep) {
      onOpen();
    }
  }, [authUser,router]);
  return (
    <Modal isOpen={isOpen} onClose={() => null} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChangePassword user={authUser} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HomeModal;
