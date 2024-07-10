"use client";
import { InPlay } from "@/components/InPlay";
import { Layout } from "@/components/common/Layout";
const HomePage = (authUser: any) => {
  return (
    <Layout isPublic={true} authUser={authUser}>
      <InPlay authUser={authUser} />
    </Layout>
  );
};

export default HomePage;
