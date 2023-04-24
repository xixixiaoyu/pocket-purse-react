import { faker } from '@faker-js/faker';
import { createTagsData } from '../helper/tags.mock.helper';

interface TagData {
  succeed: (params: { id: number }) => APIResponse.Tag;
  failed: API.Error;
}

export const tagData: TagData = {
  succeed: ({ id }) => ({
    resource: {
      id,
      user_id: 0,
      name: faker.word.verb(),
      sign: '🤫',
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.past().toISOString(),
      kind: Math.random() > 0.5 ? 'expenses' : 'income',
    },
  }),
  failed: {
    reason: '请求失败',
  },
};

interface TagsData {
  succeed: (params: {
    kind: ItemModel['kind'];
    page: number;
    size: number;
    total: number;
  }) => APIResponse.Tags;
  failed: API.Error;
}

export const tagsData: TagsData = {
  succeed: ({ kind, page, size, total }) =>
    createTagsData({
      kind,
      page,
      size,
      total,
    }),
  failed: {
    reason: '请求失败',
  },
};
