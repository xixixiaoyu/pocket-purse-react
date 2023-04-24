import { useRequest } from '../hooks';

export const useApi = () => {
  const { request } = useRequest();

  const api = {
    // user 系列接口
    user: {
      getUser: () =>
        request.get<APIResponse.User>('/api/v1/me', {
          loading: true,
          handleError: true,
        }),
      getSmsCode: (email: string) =>
        request.post<any>(
          '/api/v1/validation_codes',
          { email },
          { loading: true, loadingText: '请求发送验证码...', handleError: true }
        ),
      signIn: ({ email, authCode }: SignInData) =>
        request.post<APIResponse.LoginSucceed>(
          '/api/v1/session',
          { email, code: authCode },
          {
            loading: true,
            loadingText: '登录中...',
            handleError: true,
          }
        ),
    },
    // item 系列接口
    item: {
      getItems: () =>
        request.get<APIResponse.Items>('/api/v1/items', {
          loading: true,
          handleError: true,
        }),
      createItem: (data: Partial<ItemModel>) =>
        request.post<APIResponse.Item>('/api/v1/items', data, {
          loading: true,
          loadingText: '记账中，请稍候...',
          handleError: true,
        }),
      getBalance: (start: string, end: string) =>
        request.get<Balance>(
          `/api/v1/items/balance?happened_after=${start}&happened_before=${end}`,
          {
            loading: false,
            handleError: true,
          }
        ),
    },
    // tag 系列接口
    tag: {
      getTag: (id: number) =>
        request.get<APIResponse.Tag>(`/api/v1/tag?id=${id}`, {
          loading: true,
          handleError: true,
        }),
      getTags: (kind: ItemModel['kind']) =>
        request.get<APIResponse.Tags>(`/api/v1/tags?kind=${kind}`, {
          loading: true,
          handleError: true,
        }),
      createTag: (data: Partial<TagModel>) =>
        request.post<APIResponse.Tag>('/api/v1/tags', data, {
          loading: true,
          loadingText: '创建中，请稍候...',
          handleError: true,
        }),
      updateTag: (data: Partial<TagModel>) =>
        request.patch<APIResponse.Tag>(`/api/v1/tags/${data.id}`, data, {
          loading: true,
          loadingText: '更新中，请稍候...',
          handleError: true,
        }),
      deleteTag: (id: number) =>
        request.delete(`/api/v1/tags/${id}`, {
          loading: true,
          loadingText: '删除中，请稍候...',
          handleError: true,
        }),
    },
    statistics: {
      getLineData: (params: {
        kind: ItemModel['kind'];
        start: string;
        end: string;
      }) =>
        request.get<APIResponse.SummaryLine>(
          `/api/v1/items/summary?kind=${params.kind}&happened_after=${params.start}&happened_before=${params.end}&group_by=happened_at`,
          {
            loading: true,
            handleError: true,
          }
        ),
      getPieData: (params: {
        kind: ItemModel['kind'];
        start: string;
        end: string;
      }) =>
        request.get<APIResponse.SummaryPie>(
          `/api/v1/items/summary?kind=${params.kind}&happened_after=${params.start}&happened_before=${params.end}&group_by=tag_id`,
          {
            loading: true,
            handleError: true,
          }
        ),
    },
  };

  return { api };
};
