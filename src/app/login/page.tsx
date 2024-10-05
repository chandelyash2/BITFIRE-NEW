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
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      router.push("/");
    }
  }, [router]);
  const handleClick = () => setShow(!show);
  const [login] = useAuthLoginMutation();

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
        status: "warning",
      });
    }
  };
  // const disabled = form.userName.length > 0 && form.password.length > 0;
  return (
    <div className="flex flex-col items-center justify-center bg-primary h-screen p-10 lg:flex-row text-white">
      <div className="md:flex-[.8] flex flex-col items-center w-full">
        <div className="flex flex-col gap-10 text-left items-center">
          <Link href="/">
            <Image src="/Logo.png" width="200" height="80" alt="logo" />
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
              <InputRightElement
                onClick={handleClick}
                className="text-secondary"
              >
                {!show ? <IoMdEye /> : <IoMdEyeOff />}
              </InputRightElement>
            </InputGroup>
            <Button colorScheme="blue" onClick={(e) => handleSubmit(e)}>
              Login
            </Button>

            <Button
              colorScheme="green"
              onClick={(e) => {
                const phoneNumber = "1234567890";
                const message = "Hello, I would like to sign up!";

                // Encode the message for URL
                const encodedMessage = encodeURIComponent(message);

                // Redirect to WhatsApp
                window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
              }}
            >
              Signup
            </Button>
            {/* <Button
              colorScheme="teal"
              onClick={async (e) => {
                const result = await login({
                  variables: {
                    input: {
                      userName: "test121",
                      password: "Code@123",
                    },
                  },
                });
                const resultData = result.data?.authLogin;
                if (resultData?.user) {
                  resultData.token && loginUser(resultData.token);

                  router.push("/");
                }
              }}
            >
              Login With Demo Id
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
