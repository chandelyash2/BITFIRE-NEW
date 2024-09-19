import { Layout } from "@/components/common/Layout";
import { PL } from "@/components/P&L";

const PLPage = () => {
  return (
    <Layout isPublic={false}>
      <PL />
    </Layout>
  );
};

export default PLPage;
