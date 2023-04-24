import { faker } from '@faker-js/faker';

let itemId = 0;
const getItemId = (): number => {
  itemId += 1;
  return itemId;
};

export const createTag = (kind: ItemModel['kind']): TagModel => {
  const id = getItemId();
  return {
    id,
    user_id: 0,
    name: faker.word.verb(),
    sign: faker.internet.emoji(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind,
  };
};

const createTags = (kind: ItemModel['kind'], num: number): TagModel[] => {
  return Array.from({ length: num }).map(() => createTag(kind));
};

export const createTagsData = ({
  kind,
  page = 1,
  size = 30,
  total = 100,
}: {
  kind: ItemModel['kind'];
  page?: number;
  size?: number;
  total?: number;
}): APIResponse.Tags => {
  const hasSend = (page - 1) * size;
  const hasLeft = total - hasSend;
  const tags = hasLeft > 0 ? createTags(kind, Math.min(size, hasLeft)) : [];
  return {
    resources: tags,
    pager: {
      page,
      size,
      total,
    },
  };
};
