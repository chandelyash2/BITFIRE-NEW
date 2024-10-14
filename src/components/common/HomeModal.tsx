import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChangePassword } from "./ChangePassword";
import { User } from "@/graphql/generated/schema";

const HomeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authUser, setAuthUSer] = useState<User | any>();
  useEffect(() => {
    // Function to get and parse user data from sessionStorage with retry logic
    const fetchUserDataWithRetry = async (maxRetries = 3) => {
      let attempts = 0;
      let userData = null;

      while (attempts < maxRetries) {
        try {
          const encryptedData: any = sessionStorage.getItem("userData");
          console.log(encryptedData, "ENCRRR");

          // If data is not found or empty, throw an error to retry
          if (!encryptedData) throw new Error("No user data found");

          const parsedData = JSON.parse(encryptedData);
          userData = parsedData;
          break; // If parsing is successful, exit the loop
        } catch (error) {
          console.error(`Attempt ${attempts + 1} failed:`, error);
          attempts += 1;

          // Delay before retrying (optional)
          await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay between retries
        }
      }

      if (userData) {
        setAuthUSer(userData);
      } else {
        console.warn("Failed to retrieve user data after 3 attempts");
      }
    };

    fetchUserDataWithRetry();
  }, []);
  useEffect(() => {
    if (authUser?.loginStep) {
      onOpen();
    }
  }, [authUser]);
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
