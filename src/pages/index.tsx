import Home from "view/home";
import {GetStaticProps, NextPage} from "next";
import {dehydrate, QueryClient} from "react-query";
import {getCoins} from "api/getAllCoin";

const HomePage: NextPage = () => {
  return <Home />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["coins"],
    queryFn: () => getCoins({isServer: true, params: {page: 1}}),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
