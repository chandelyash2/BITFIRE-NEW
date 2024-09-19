import { Event } from "@/components/Event";
import { Layout } from "@/components/common/Layout";

const EventPage = () => {
  return (
    <Layout isPublic={true} >
      <Event/>
    </Layout>
  );
};

export default EventPage;
