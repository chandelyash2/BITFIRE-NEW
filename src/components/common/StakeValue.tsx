import {
  MeDocument,
  User,
  useUpdateUserMutation,
} from "@/graphql/generated/schema";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface StakeValueProp {
  onClose: () => void;
  user: User;
}
export const StakeValue = ({ onClose, user }: StakeValueProp) => {
  const [formVal, setFormval] = useState<any>([]);
  const toast = useToast();
  useEffect(() => {
    if (user.stakes) {
      setFormval(user?.stakes);
    }
  }, [user.stakes]);
  const [updateStake] = useUpdateUserMutation({
    refetchQueries: [MeDocument],
  });
  const updateUser = async () => {
    const result = await updateStake({
      variables: {
        input: {
          stakes: formVal,
        },
      },
    });
    result.data?.updateUser &&
      toast({
        description: "Stake Updated!!!",
        status: "success",
      });
    onClose();
  };
  return (
    <div className="grid grid-cols-2 gap-4 text-primary p-2">
      {formVal.map((item: Number, i: number) => (
        <Input
          type="number"
          value={JSON.stringify(item) || ""}
          className="max-w-xs border"
          key={i}
          onChange={(e) => {
            const updatedFormVal = [...formVal];
            updatedFormVal[i] = parseInt(e.target.value);
            setFormval(updatedFormVal);
          }}
        />
      ))}
      <div className="flex gap-4">
        <Button colorScheme="red" onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="green" onClick={updateUser}>
          Save
        </Button>
      </div>
    </div>
  );
};
