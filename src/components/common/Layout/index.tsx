"use client";

import { Container } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  //   isPublic?: boolean;
  //   authUser?: User;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-background min-h-screen absolute top-0 w-full z-1">
      <Container maxW='container.2xl'>
        <Header />
        <div className="flex mt-4 ">
          <div className="lg:w-[20%] hidden lg:flex">
            <Sidebar />
          </div>
          <div className="lg:w-[85%] lex-1 mb-[40px] w-full">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
};
