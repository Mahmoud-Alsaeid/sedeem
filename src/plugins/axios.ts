import axios, { AxiosRequestConfig } from "axios";

const axiosIns = axios.create({
  baseURL: "https://dash.sadeemlight.com/dash/api/v1",
  // You can add your headers here
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

function convertKeysToCamelCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }
  const camelCaseObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey =
        key === "_id" ? "id" : key.replace(/_./g, (x) => x[1].toUpperCase());
      camelCaseObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
    }
  }
  return camelCaseObj;
}

axiosIns.defaults.transformResponse = function (data: any, headers: any) {
  if (typeof data !== "string") return data;
  try {
    const parsedData = JSON.parse(data);
    const response = convertKeysToCamelCase(parsedData);
    return response;
  } catch (error) {
    return data;
  }
};

export const addTokenToAxios = (token: string) => {
  axiosIns.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosIns.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = sessionStorage.getItem("accessToken");
  if (config.headers) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosIns;
