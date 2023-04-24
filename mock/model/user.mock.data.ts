interface UserData {
  succeed: APIResponse.User;
  failed: API.Error;
}

export const userData: UserData = {
  succeed: {
    resource: {
      id: 0,
      email: 'test@gmail.com',
      name: 'DesnLee',
      created_at: '2020-01-01',
      updated_at: '2020-01-01',
    },
  },
  failed: {
    reason: '请求失败',
  },
};
