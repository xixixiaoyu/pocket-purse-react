import { createItemsData } from '../helper/items.mock.helper';

interface ItemsData {
  succeed: (params: {
    page: number;
    size: number;
    total: number;
  }) => APIResponse.Items;
  failed: API.Error;
}

export const itemsData: ItemsData = {
  succeed: ({ page, size, total }) =>
    createItemsData({
      page,
      size,
      total,
    }),
  failed: {
    reason: '请求失败',
  },
};
