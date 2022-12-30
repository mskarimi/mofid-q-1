import {Select} from "antd";
import {useQuery} from "react-query";
import {getCategory} from "api/getCategory";
import {useMemo} from "react";

interface ICategoryFilter {
  value: string | null;
  onClear: () => void;
  onChange: (value: string) => void;
}

function CategoryFilter({value, onClear, onChange}: ICategoryFilter) {
  const {data, isFetching, isLoading} = useQuery("category", () => getCategory(), {
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    return data?.map((item) => {
      return {
        label: item.name,
        value: item.category_id,
      };
    });
  }, [data]);

  return (
    <div className="mb-5">
      <Select
        loading={isLoading || isFetching}
        placeholder="category"
        popupClassName="bg-mainBg text-textColor"
        allowClear
        options={options}
        className="w-[250px]"
        value={value}
        onClear={onClear}
        onChange={onChange}
      />
    </div>
  );
}

export default CategoryFilter;
