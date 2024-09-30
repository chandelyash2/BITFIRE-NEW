"use client";
import { Container, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Auth from "../Auth";
import { User } from "@/graphql/generated/schema";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  isPublic?: boolean;
}

export const Layout = ({ children, isPublic }: LayoutProps) => {
  return (
    // <Auth isPublic={isPublic}>
    <div className="bg-background min-h-screen absolute top-0 w-full z-1 ">
      <Container maxW="container.2xl " className="mb-[170px]">
        <Header />
        <div className="flex mt-28 mb-10">
          <div className="lg:w-[15%] hidden lg:flex">
            <Sidebar />
          </div>
          <div className="lg:w-[85%] w-full">{children}</div>
        </div>
      </Container>
      <Footer />
    </div>
    // </Auth>
  );
};
