import { axiosInstance } from '../lib/request';
import { ErrorNoData, ErrorUnauthorized } from '../vars/errors';

export const isEmptyData = () => {
  return axiosInstance
    .get<APIResponse.Items>('/api/v1/items?pre_check=1')
    .then((res) => {
      if (res.data.resources.length === 0) {
        throw new ErrorNoData();
      }
      return null;
    })
    .catch(() => null);
};

export const isUnaAuthorizedLoader = () => {
  return axiosInstance
    .get<APIResponse.User>('/api/v1/me?pre_check=1')
    .then(() => null)
    .catch((e) => {
      if (e.response.status === 401) {
        throw new ErrorUnauthorized();
      }
    });
};
