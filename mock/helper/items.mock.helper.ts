// 创建 item id

import { faker } from '@faker-js/faker';
import { createTag } from './tags.mock.helper';

let itemId = 0;
const getItemId = (): number => {
  itemId += 1;
  return itemId;
};

// 创建一个 item
export const createItem = (): ItemModel => {
  const id = getItemId();
  const kind = Math.random() > 0.3 ? 'expenses' : 'income';
  // const note = ['吃饭', '喝水', '睡觉', '打豆豆'][
  //   Math.floor(Math.random() * 4)
  // ];
  return {
    id,
    user_id: 0,
    amount: faker.datatype.number({
      min: 100,
      max: 1000000,
    }),
    note: faker.word.verb(),
    tag_ids: [1],
    tags: [createTag(kind)],
    happened_at: faker.date.recent().toISOString(),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    kind,
  };
};

const createItems = (num: number) => {
  return Array.from({ length: num }).map(() => createItem());
};

export const createItemsData = ({
  page = 1,
  size = 10,
  total = 100,
}): APIResponse.Items => {
  const hasSend = (page - 1) * size;
  const hasLeft = total - hasSend;
  const items = hasLeft > 0 ? createItems(Math.min(size, hasLeft)) : [];
  return {
    resources: items,
    pager: {
      page,
      size,
      total,
    },
  };
};
