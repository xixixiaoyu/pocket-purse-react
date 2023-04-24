// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TagModel = {
  id: number;
  user_id: number;
  name: string;
  sign: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  kind: ItemModel['kind'];
};

declare namespace APIResponse {
  type Tag = API.Resource<TagModel>;
  type Tags = API.Resources<TagModel>;
}
