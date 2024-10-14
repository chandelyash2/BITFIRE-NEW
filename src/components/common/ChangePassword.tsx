import { Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { StakeValueProp } from "./StakeValue";
import { useChangePasswordMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/navigation";

export const ChangePassword = ({ onClose, user }: StakeValueProp) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const [changePassword] = useChangePasswordMutation();
  const updatePassword = async () => {
    if (password !== confirmPassword) {
      return toast({
        description: "Password didn't match",
        status: "error",
        duration: 3000,
      });
    }
    if (oldPassword === password) {
      return toast({
        description: "Old password and new password should not be same",
        status: "error",
        duration: 3000,
      });
    }
    const updated = await changePassword({
      variables: {
        input: {
          oldPassword: oldPassword,
          newPassword: password,
        },
      },
    });
    const output = updated.data?.changePassword;

    if (output?.user) {
      onClose();
      return toast({
        description: "Password Updated Successfully",
        status: "success",
        duration: 3000,
      });
    } else {
      return toast({
        description: output?.error?.message,
        status: "error",
        duration: 3000,
      });
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Old Password"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <Input
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        placeholder="Confrim Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        colorScheme="green"
        onClick={updatePassword}
        isDisabled={oldPassword && password && confirmPassword ? false : true}
      >
        Update
      </Button>
    </div>
  );
};
