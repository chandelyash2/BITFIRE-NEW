"use client";
import { useAuthLoginMutation } from "@/graphql/generated/schema";
import { loginUser } from "@/utils/cookies";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const toast = useToast();

  const handleClick = () => setShow(!show);
  const [login, { loading: loginLoading }] = useAuthLoginMutation();
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    const result = await login({
      variables: {
        input: form,
      },
    });
    const resultData = result.data?.authLogin;
    if (resultData?.user) {
      resultData.token && loginUser(resultData.token);

      router.push("/");
    }
    if (resultData?.error) {
      return toast({
        description: resultData.error.message,
        status: "error",
      });
    }
  };
  const disabled = form.userName.length > 0 && form.password.length > 0;
  return (
    <div className="flex flex-col items-center justify-center bg-primary h-screen p-10 lg:flex-row text-white">
      <div className="md:flex-[.8] flex flex-col items-center w-full">
        <div className="flex flex-col gap-10 text-left items-center">
          <Link href="/">
            <Image src="/logo.png" width="200" height="80" alt="logo" />
          </Link>

          <h3 className="text-xl font-semibold">Watch. Improve. Achieve.</h3>
        </div>
      </div>
      <div className="md:flex-[1] flex flex-col items-center mt-10">
        <div className="flex flex-col gap-6 text-left">
          <span>Welcome back! Please enter your details</span>
          <div className="flex flex-col gap-6">
            <Input
              name="userName"
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setForm({
                  ...form,
                  userName: e.target.value,
                })
              }
            />
            <InputGroup>
              <Input
                name="password"
                placeholder="Password"
                type={show ? "text" : "password"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
              <InputRightElement onClick={handleClick}>
                {!show ? <IoMdEye /> : <IoMdEyeOff />}
              </InputRightElement>
            </InputGroup>

            <Button colorScheme="blue" onClick={(e) => handleSubmit(e)}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
