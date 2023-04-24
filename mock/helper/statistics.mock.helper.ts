import { faker } from '@faker-js/faker';
import { createTag } from './tags.mock.helper';

const tagNames = {
  expenses: ['吃饭', '交通', '购物', '娱乐', '其他'],
  income: ['工资', '奖金', '其他'],
};

export const createStatisticsData = ({
  start,
  end,
  kind,
  group_by,
}: {
  start: string;
  end: string;
  kind: ItemModel['kind'];
  group_by: 'happened_at' | 'tag_id';
}): APIResponse.SummaryPie | APIResponse.SummaryLine | undefined => {
  const groups = [];
  const startTime = new Date(start);
  const endTime = new Date(end);

  // happened_at 分组
  if (group_by === 'happened_at') {
    // eslint-disable-next-line no-unmodified-loop-condition
    while (startTime < endTime) {
      startTime.setDate(startTime.getDate() + 1);

      if (Math.random() > 0.3) continue;
      groups.push({
        happened_at: startTime.toISOString(),
        amount: faker.datatype.number(100000),
        tag: null,
      });
    }

    return {
      groups,
      total: groups.reduce((acc, cur) => acc + cur.amount, 0),
    };
  }

  // tag_id 分组
  if (group_by === 'tag_id') {
    const tagNameList = tagNames[kind];
    const tags: TagModel[] = tagNameList.map((name) => ({
      ...createTag(kind),
      name,
    }));
    const result: SummaryByTag[] = tags.map((tag) => ({
      tag_id: tag.id,
      amount: faker.datatype.number(1000000),
      tag,
    }));
    return {
      groups: result,
      total: result.reduce((acc, cur) => acc + cur.amount, 0),
    };
  }
};
