import { Event } from "@/components/Event";
import { Layout } from "@/components/common/Layout";

const EventPage = (authUser: any) => {
  return (
    <Layout>
      <Event authUser={authUser} />
    </Layout>
  );
};

export default EventPage;
