// import { getErrorResponse } from "assets/plugins/__function";
import {
  removeSessionStorage,
  setSessionStorage,
} from "@/configs/asyncStorage";
import { getErrorResponse } from "@/configs/utils";
import _ from "lodash";
import toast from "react-hot-toast";

const onRequest = (config) => {
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = async (response) => {
  if (response.config.url.includes("auth/check")) {
    await setSessionStorage("token", response.data.token);
    let data = response.data;
    delete data.token;
    await setSessionStorage("login_data", JSON.stringify(data));
  }
  return response;
};

const onResponseError = async (error) => {
  let errors = getErrorResponse(error) || [];
  if (
    errors.includes("Sesi telah berakhir, silahkan login kembali!") ||
    error.response.status == 401
  ) {
    await removeSessionStorage("token");
    await removeSessionStorage("login_data");
    if (window.location.hash != "#/auth/sign-in") {
      toast.error("Sesi telah berakhir, silahkan login kembali!");
      window.location.href = "#/auth/sign-in";
    }
  }
  if (_.isArray(errors)) _.map(errors, (el) => toast.error(el));
  if (_.isString(errors)) toast.error(errors);
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
