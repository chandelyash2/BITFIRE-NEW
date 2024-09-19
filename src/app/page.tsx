import { InPlay } from "@/components/InPlay";
import { Layout } from "@/components/common/Layout";

const HomePage = () => {
  return (
    <Layout isPublic={true}>
      <InPlay />
    </Layout>
  );
};

export default HomePage;
