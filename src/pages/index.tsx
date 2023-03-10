import Home from "view/home";
import {GetStaticProps, NextPage} from "next";
import {dehydrate, QueryClient} from "react-query";
import {getCoins} from "api/getCoin";
import {getCategory} from "api/getCategory";

const HomePage: NextPage = () => {
  return <Home />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["coins", 1],
    queryFn: () => getCoins({isServer: true, params: {page: 1}}),
  });
  await queryClient.prefetchQuery({
    queryKey: "category",
    queryFn: () => getCategory(true),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

export default HomePage;
