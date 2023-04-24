import type { MockMethod } from 'vite-plugin-mock';
import { createTag } from '../helper/tags.mock.helper';
import { tagData, tagsData } from '../model/tags.mock.data';

export const tagsAPI: MockMethod[] = [
  {
    url: '/api/v1/tag',
    method: 'get',
    statusCode: 200,
    timeout: 500,
    response: ({ query }: Mock.Request) => {
      return tagData.succeed({ id: Number(query.id ?? 0) });
    },
  },
  {
    url: '/api/v1/tags',
    method: 'get',
    statusCode: 200,
    timeout: 500,
    response: ({ query }: Mock.Request): APIResponse.Tags => {
      return tagsData.succeed({
        kind: query.kind as ItemModel['kind'],
        page: parseInt(query.page) || 1,
        size: parseInt(query.limit) || 10,
        total: 34,
      });
    },
  },
  {
    url: '/api/v1/tags',
    method: 'post',
    statusCode: 200,
    timeout: 1000,
    response: ({ body }: any) => {
      return { resource: { ...createTag(body.kind), ...body } };
      // return {
      //   msg: '创建失败',
      // };
    },
  },
  {
    url: '/api/v1/tags/:id',
    method: 'patch',
    statusCode: 200,
    timeout: 1000,
    response: ({ body }: any) => {
      return { resource: { ...createTag(body.kind), ...body } };
      // return {
      //   msg: '创建失败',
      // };
    },
  },
  {
    url: '/api/v1/tags/:id',
    method: 'delete',
    statusCode: 204,
    timeout: 1000,
  },
];
