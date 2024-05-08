import axios from "axios";
import qs from "qs";

import storage from "./storage";

import { TOOKEN_KEY, useAuthStore } from "@/store/auth";

// 不用qs转换的content-type
const noQsTypes = ["application/json", "text/plain"];

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // 设置在.env对应环境的请求中
  timeout: 200000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 针对有些config写的是大写
    config.method = config.method.toLowerCase();
    // 不是json请求格式的post和put做请求参数转换
    if (
      (config.method === "post" || config.method === "put") &&
      config.headers &&
      !noQsTypes.includes(config.headers["Content-Type"])
    ) {
      config.data = qs.stringify(config.data);
    }

    // 获取一下登陆的token值
    const token = storage.get(TOOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 未登录跳转登录
    if (response.status === 401 || res.status === 401) {
      const authStore = useAuthStore();
      authStore.loginOut();
      return Promise.reject(new Error("未登录"));
    }
    if (response.status !== 200) {
      const message = res.message || "网络异常请稍后重试";
      return Promise.reject(new Error(message));
    }
    return res;
  },
  (error) => {
    let message = error.message;
    message =
      message.indexOf("timeout") > -1
        ? "请求超时，请稍后"
        : "网络异常请稍后重试";
    return Promise.reject(message);
  }
);
export default service;
