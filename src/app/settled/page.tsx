import { Layout } from "@/components/common/Layout";
import { Settled } from "@/components/Settled";

const SettledPage = (authUser: any) => {
    
  return (
    <Layout isPublic={false} authUser={authUser}>
      <Settled />
    </Layout>
  );
};

export default SettledPage;
