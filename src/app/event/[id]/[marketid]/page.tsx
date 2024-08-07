import { Layout } from "@/components/common/Layout";
import { RacingEvent } from "@/components/RacingEvent";
import React from "react";

const RacingPage = (authUser: any) => {
  return (
    <Layout isPublic={true} authUser={authUser}>
      <RacingEvent authUser={authUser} />
    </Layout>
  );
};

export default RacingPage;
