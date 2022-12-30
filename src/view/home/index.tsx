import {useEffect, useState} from "react";
import CoinsTable from "view/home/CoinsTable";
import {useQuery} from "react-query";
import {getCoins} from "api/getAllCoin";
import Paginate from "view/home/Paginate";

function Home() {
  const [page, setPage] = useState(1);
  const {data, isFetching, isLoading} = useQuery(["coins", page], () => getCoins({params: {page}}), {
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    window.scrollTo({top: 0});
  }, [page]);

  return (
    <div className="sizeScreen my-5">
      <CoinsTable data={data} isFetching={isFetching} isLoading={isLoading} page={page} />
      <Paginate
        disabled={isLoading || isFetching}
        hasNext={data?.length === 20}
        hasPrev={page > 1}
        onClickNext={() => setPage((prevState) => prevState + 1)}
        onClickPrev={() => setPage((prevState) => prevState - 1)}
      />
    </div>
  );
}

export default Home;
