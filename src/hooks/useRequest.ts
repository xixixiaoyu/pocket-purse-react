import type { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/request';
import { useToastStore } from '../stores';

export const ERROR_MESSAGE: {
  [key: number]: { text: string; jumpTo?: string };
} = {
  400: { text: '请求参数错误' },
  401: { text: '请先登录', jumpTo: '/sign_in' },
  9999: { text: '未知错误' },
};

const noCheck401 = ['/api/v1/sign_in', '/api/v1/send_sms_code'];

interface ExtraOptions {
  loading?: boolean;
  loadingText?: string;
  handleError?: boolean;
}

export interface MyRequest {
  get: <T>(
    url: string,
    options?: ExtraOptions
  ) => Promise<AxiosResponse<T, any>>;
  post: <T>(
    url: string,
    data: any,
    options?: ExtraOptions
  ) => Promise<AxiosResponse<T, any>>;
  patch: <T>(
    url: string,
    data: any,
    options?: ExtraOptions
  ) => Promise<AxiosResponse<T, any>>;
  delete: <T>(
    url: string,
    options?: ExtraOptions
  ) => Promise<AxiosResponse<T, any>>;
}

export const useRequest = () => {
  const nav = useNavigate();
  const { pathname, search } = useLocation();
  const { openToast, closeToast } = useToastStore();

  const errorHandler = (err: AxiosError<API.Error>) => {
    if (err.response) {
      const error = ERROR_MESSAGE[err.response.status];
      let text;
      let jumpTo = '';

      // 统一错误提示，如果前端预设了错误提示，则使用预设的，否则使用后端返回的，后端也没有返回则使用未知错误
      if (error && !noCheck401.includes(err.response.config.url ?? '')) {
        text = error.text;
        jumpTo = error.jumpTo ?? '';
      } else if (err.response.data && err.response.data.reason) {
        text = err.response.data.reason;
      } else {
        text = ERROR_MESSAGE[9999].text;
      }
      openToast({
        type: 'error',
        text,
      });

      // 如果有跳转地址，则跳转
      if (jumpTo) {
        // 如果是 401 错误，则跳转时带上当前页面的地址，登录后跳转回来
        if (err.response.status === 401) {
          const redirect = encodeURIComponent(`${pathname}${search}`);
          nav(`${jumpTo}?redirect=${redirect}`, { replace: true });
        } else {
          nav(jumpTo);
        }
      }
    }

    throw err;
  };

  const request: MyRequest = {
    get: (url, options) => {
      if (options?.loading) {
        openToast({
          type: 'loading',
          text: options?.loadingText ?? '加载中...',
        });
      }
      return axiosInstance
        .get(url)
        .catch(
          options?.handleError
            ? errorHandler
            : (e) => {
                throw e;
              }
        )
        .finally(() => closeToast('loading'));
    },
    post: (url, data, options) => {
      if (options?.loading) {
        openToast({
          type: 'loading',
          text: options?.loadingText ?? '加载中...',
        });
      }
      return axiosInstance
        .post(url, data)
        .catch(
          options?.handleError
            ? errorHandler
            : (e) => {
                throw e;
              }
        )
        .finally(() => closeToast('loading'));
    },
    patch: (url, data, options) => {
      if (options?.loading) {
        openToast({
          type: 'loading',
          text: options?.loadingText ?? '加载中...',
        });
      }
      return axiosInstance
        .patch(url, data)
        .catch(
          options?.handleError
            ? errorHandler
            : (e) => {
                throw e;
              }
        )
        .finally(() => closeToast('loading'));
    },
    delete: (url, options) => {
      if (options?.loading) {
        openToast({
          type: 'loading',
          text: options?.loadingText ?? '加载中...',
        });
      }
      return axiosInstance
        .delete(url)
        .catch(
          options?.handleError
            ? errorHandler
            : (e) => {
                throw e;
              }
        )
        .finally(() => closeToast('loading'));
    },
  };

  return { request };
};
