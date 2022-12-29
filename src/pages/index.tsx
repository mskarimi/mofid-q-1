import Home from "view/home";
import {GetStaticProps, NextPage} from "next";
import {dehydrate, QueryClient} from "react-query";

const HomePage: NextPage = () => {
  return <Home />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
