interface UserModel {
  id: number;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

declare namespace APIResponse {
  type User = API.Resource<UserModel>;
}
