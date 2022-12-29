import axios, {AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method} from "axios";

export type Progress = (progressEvent: any) => void;

interface IAxiosService<T> {
  url: string;
  method: Method;
  body?: T;
  isFormData?: boolean;
  token?: string;
  noCache?: boolean;
  timeout?: number;
  onUploadProgress?: Progress;
  onDownloadProgress?: Progress;
  headers?: AxiosRequestHeaders;
  params?: Object;
}

export function axiosService<Response = any, Body = any>(props: IAxiosService<Body>) {
  const {
    url,
    method,
    body,
    isFormData,
    noCache,
    onDownloadProgress,
    onUploadProgress,
    timeout,
    token,
    headers,
    params,
  } = props;

  let options: AxiosRequestConfig<Body> = {
    url,
    method: method,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      "Accept-Encoding": "*",
    },
    timeout: timeout || timeout === 0 ? timeout : 10000,
    withCredentials: true,
  };

  if (headers) {
    options.headers = {
      ...options.headers,
      ...headers,
    };
  }
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: token,
    };
  }

  if (noCache) {
    options.headers = {
      ...options.headers,
      "Cache-Control": "no-cache",
    };
  }

  if (params && Object.keys(params)?.length) {
    options.params = params;
  }

  if (body) {
    options.data = body;
  }

  if (onUploadProgress) {
    options.onUploadProgress = onUploadProgress;
  }

  if (onDownloadProgress) {
    options.onDownloadProgress = onDownloadProgress;
  }
  return new Promise<AxiosResponse<Response>>((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res);
      })
      .catch((error: AxiosError<any>) => {
        if (error.response) {
          reject(error.response);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error);
        }
      });
  });
}
