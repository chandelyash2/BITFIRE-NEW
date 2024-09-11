"use client";
import { Container } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Auth from "../Auth";
import { User } from "@/graphql/generated/schema";

interface LayoutProps {
  children: React.ReactNode;
  isPublic?: boolean;
  authUser: User;
}

export const Layout = ({ children, isPublic, authUser }: LayoutProps) => {
  return (
    <Auth isPublic={isPublic}>
      <div className="bg-background min-h-screen absolute top-0 w-full z-1">
        <Container maxW="container.2xl">
          <Header authUser={authUser} />
          <div className="flex mt-28 mb-4">
            <div className="lg:w-[15%] hidden lg:flex">
              <Sidebar />
            </div>
            <div className="lg:w-[85%] w-full">{children}</div>
          </div>
        </Container>
      </div>
  </Auth>
  );
};
