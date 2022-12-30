import {axiosService} from "utils/axiosService";
import {API} from "api/const";
import {RawAxiosRequestHeaders} from "axios";

export interface IGetCoinsRes {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

type TGetCoins = ({isServer, params}: {isServer?: boolean; params?: object}) => Promise<IGetCoinsRes[]>;
export const getCoins: TGetCoins = ({isServer = false, params}) => {
  let headers: RawAxiosRequestHeaders = {};
  if (isServer) {
    headers = {
      "Accept-Encoding": "*",
    };
  }
  return axiosService({
    url: isServer ? process.env.DOMAIN + API.GET_COIN : API.GET_COIN,
    method: "get",
    params,
    headers,
  }).then((res) => res.data);
};
