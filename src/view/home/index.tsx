import {useEffect, useMemo, useState} from "react";
import CoinsTable from "view/home/CoinsTable";
import {useQuery} from "react-query";
import {getCoins} from "api/getCoin";
import Paginate from "view/home/Paginate";
import CategoryFilter from "view/home/CategoryFilter";

function Home() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | null>(null);

  const queryKey = useMemo(() => {
    const tmp = ["coins", page];
    if (category) tmp.push(category);
    return tmp;
  }, [category, page]);

  const params = useMemo(() => {
    const tmp: {[x: string]: any} = {page};
    if (category) {
      tmp.category = category;
    }
    return tmp;
  }, [page, category]);

  const {data, isFetching, isLoading} = useQuery(queryKey, () => getCoins({params}), {
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    window.scrollTo({top: 0});
  }, [page]);

  return (
    <div className="sizeScreen my-5">
      <CategoryFilter
        value={category}
        onChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        onClear={() => {
          setCategory(null);
          setPage(1);
        }}
      />
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
