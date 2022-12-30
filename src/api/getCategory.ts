import {RawAxiosRequestHeaders} from "axios";
import {axiosService} from "utils/axiosService";
import {API} from "api/const";

export interface IGetCategory {
  category_id: string;
  name: string;
}

type TGetCategory = (isServer?: boolean) => Promise<IGetCategory[]>;
export const getCategory: TGetCategory = (isServer = false) => {
  let headers: RawAxiosRequestHeaders = {};
  if (isServer) {
    headers = {
      "Accept-Encoding": "*",
    };
  }
  return axiosService({
    url: isServer ? process.env.DOMAIN + API.GET_CATEGORIES_LIST : API.GET_CATEGORIES_LIST,
    method: "get",
    headers,
  }).then((res) => res.data);
};
