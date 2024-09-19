import { Layout } from "@/components/common/Layout";
import { RacingEvent } from "@/components/RacingEvent";
import React from "react";

const RacingPage = () => {
  return (
    <Layout isPublic={true}>
      <RacingEvent/>
    </Layout>
  );
};

export default RacingPage;
