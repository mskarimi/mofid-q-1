import React, {useCallback, useMemo} from "react";
import {IGetCoinsRes} from "api/getAllCoin";
import {Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import {IconRoundedDown, IconRoundedUp} from "assets/icons";
import classNames from "classnames";

interface IDataType {
  key: React.Key;
  row: number;
  coin: string[];
  price: number;
  hour: number;
  day: number;
  marketCap: number;
  totalVolume: number;
  circulatingSupply: [number, string];
}

interface ICoinsTable {
  data?: IGetCoinsRes[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
}

const className = "bg-mainBg text-[#9CA3AF] border-[#374151] before:bg-mainBg rounded-none";

function CoinsTable({data, isLoading, isFetching, page}: ICoinsTable) {
  const percentRender = useCallback((value: number) => {
    const className = classNames({
      "flex items-center": true,
      "text-green-600": value >= 0,
      "text-red-600": value < 0,
    });
    const classNameArrow = classNames({
      "w-5 h-5 mr-1": true,
      "text-green-600": value >= 0,
      "text-red-600": value < 0,
    });
    const Arrow = value >= 0 ? IconRoundedUp : IconRoundedDown;
    return (
      <div className={className}>
        <Arrow className={classNameArrow} />
        {Math.abs(value).toFixed(2)}
      </div>
    );
  }, []);

  const separatedWithComma = useCallback((value: number) => {
    return <div className="flex items-center text-textColor">${value?.toLocaleString("en-US")}</div>;
  }, []);

  const columns: ColumnsType<IDataType> = useMemo(() => {
    return [
      {
        title: "#",
        dataIndex: "row",
        className,
      },
      {
        title: "COINS",
        dataIndex: "coin",
        className,
        render: (value, {coin}) => (
          <div className="flex items-center">
            <img className="w-6 h-6 mr-4" src={coin[2]} alt={coin[0]} />
            <div>
              <div className="font-bold text-textColor">{coin[0]}</div>
              <div>{coin[1].toUpperCase()}</div>
            </div>
          </div>
        ),
      },
      {
        title: "PRICE",
        dataIndex: "price",
        className,
        render: (value, {price}) => (
          <div className="text-textColor font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </div>
        ),
      },
      {
        title: "24H",
        dataIndex: "hour",
        className,
        render: (value, {hour}) => percentRender(hour),
      },
      {
        title: "7D",
        dataIndex: "day",
        className,
        render: (value, {day}) => percentRender(day),
      },
      {
        title: "MARKET CAP",
        dataIndex: "marketCap",
        className,
        render: (value, {marketCap}) => separatedWithComma(marketCap),
      },
      {
        title: "TOTAL VOLUME",
        dataIndex: "totalVolume",
        className,
        render: (value, {totalVolume}) => separatedWithComma(totalVolume),
      },
      {
        title: "CIRCULATING SUPPLY",
        dataIndex: "circulatingSupply",
        className,
        render: (value, {circulatingSupply}) => (
          <>
            <span className="text-textColor">{circulatingSupply[0]}</span>
            <span className="ml-2">{circulatingSupply[1].toUpperCase()}</span>
          </>
        ),
      },
    ];
  }, [percentRender, separatedWithComma]);

  const finalData: IDataType[] | undefined = useMemo(() => {
    return data?.map((item, index) => {
      return {
        key: index,
        row: index + 1 + (page - 1) * 20,
        coin: [item.name, item.symbol, item.image],
        price: item.current_price,
        hour: item.price_change_percentage_24h_in_currency,
        day: item.price_change_percentage_7d_in_currency,
        marketCap: item.market_cap,
        totalVolume: item.total_volume,
        circulatingSupply: [item.circulating_supply, item.symbol],
      };
    });
  }, [data, page]);

  return (
    <>
      <Table
        className="overflow-auto"
        rowClassName="bg-mainBg"
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={finalData}
        pagination={false}
      />
    </>
  );
}

export default CoinsTable;
