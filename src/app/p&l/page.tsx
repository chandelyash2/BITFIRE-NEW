import { Layout } from "@/components/common/Layout";
import { PL } from "@/components/P&L";

const PLPage = (authUser: any) => {
  return (
    <Layout isPublic={false} authUser={authUser}>
      <PL />
    </Layout>
  );
};

export default PLPage;
