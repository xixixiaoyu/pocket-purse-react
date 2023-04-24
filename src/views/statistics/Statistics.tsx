import { useEffect, useState } from 'react';
import type { FC } from 'react';
import useSWRImmutable from 'swr/immutable';
import { useApi } from '../../api/useApi';
import { Input, TopNav, TopNavGradient } from '../../components';
import { LineChart } from '../../components/Charts/LineChart';
import { PieChart } from '../../components/Charts/PieChart';
import { RankChart } from '../../components/Charts/RankChart ';
import { useTimeRange } from '../../hooks/useTimeRange';
import { time } from '../../lib/time';

export const Statistics: FC = () => {
  const { api } = useApi();

  const options: { value: ItemModel['kind']; label: string }[] = [
    { value: 'expenses', label: '支出' },
    { value: 'income', label: '收入' },
  ];
  const [kind, setKind] = useState<ItemModel['kind']>('expenses');

  // 构造时间范围
  const { start, end, TimeRangePicker } = useTimeRange({
    custom: true,
  });

  // 请求折线图数据，并补充数据
  const [displayLineData, setDisplayLineData] = useState<SummaryByHappened[]>(
    []
  );
  const { data: lineChartData } = useSWRImmutable(
    `lineChart_${kind}_${start.format()}_${end.add(1, 'day').format()}`,
    () =>
      api.statistics.getLineData({
        kind,
        start: start.format(),
        end: end.add(1, 'day').format(),
      })
  );
  useEffect(() => {
    if (!lineChartData || !Array.isArray(lineChartData.data.groups)) {
      return;
    }
    const dataList = lineChartData.data.groups;

    const result: SummaryByHappened[] = [];
    let current = new Date(start.date);
    const endTime = new Date(end.date);
    while (current <= endTime) {
      const date = time(current).format('yyyy-MM-dd');
      const find = dataList.find(
        (item) => time(item.happened_at).format() === time(date).format()
      );

      result.push(
        find ?? {
          happened_at: date,
          tag: null,
          amount: 0,
        }
      );
      current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
    }

    setDisplayLineData(result);
  }, [lineChartData]);

  // 请求饼图数据
  const { data: pieChartData } = useSWRImmutable(
    `pieChart_${kind}_${start.format()}_${end.add(1, 'day').format()}`,
    () =>
      api.statistics.getPieData({
        kind,
        start: start.format(),
        end: end.add(1, 'day').format(),
      })
  );

  return (
    <div pp-page-wrapper bg='#f4f4f4'>
      <TopNavGradient>
        <TopNav
          title='统计图表'
          rightElement={
            <Input
              type='navSelect'
              options={options}
              value={kind}
              onChange={(v) => setKind(v as ItemModel['kind'])}
            />
          }
        />
        {TimeRangePicker}
      </TopNavGradient>

      <main grow-1 overflow-auto pb-36px flex flex-col bg='#f4f4f4'>
        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            {kind === 'expenses' ? '消费' : '收入'}趋势
          </h1>
          <LineChart data={displayLineData} />
        </section>

        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            {kind === 'expenses' ? '消费' : '收入'}占比
          </h1>
          <PieChart data={pieChartData?.data.groups ?? []} />
        </section>

        <section mt-12px m-x-12px py-12px bg-white rounded-12px>
          <h1 text-18px font-bold ml-12px>
            {kind === 'expenses' ? '消费' : '收入'}排行
          </h1>
          <RankChart data={pieChartData?.data.groups ?? []} />
        </section>
      </main>
    </div>
  );
};
