import type { EChartsOption } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import * as echarts from 'echarts';
import { colorPalette } from '../../lib/colors';

interface Props {
  data: SummaryByTag[];
  height?: string;
}

export const PieChart: FC<Props> = ({ data, height }) => {
  const pie = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts>();

  // 设置图表
  const [options, _setOptions] = useState<EChartsOption>({});
  const setOptions = (data: SummaryByTag[]) => {
    const newOptions: EChartsOption = {
      color: colorPalette,
      // backgroundColor: '#fff',
      tooltip: {
        trigger: 'none',
        valueFormatter: (value) => `¥${value}`,
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        left: '6px',
      },
      grid: {},
      series: [
        {
          type: 'pie',
          radius: ['52%', '80%'],
          avoidLabelOverlap: false,
          center: ['64%', '50%'],
          showEmptyCircle: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 3,
            decal: {
              color: '#ffffff33',
              backgroundColor: 'transparent',
              dashArrayX: [1, 0],
              dashArrayY: [4, 3],
              rotation: -Math.PI / 4,
            },
          },
          label: {
            show: false,
            position: 'center',
            formatter: ['{name|{b}}', `{value|¥{c}}`, '{percent|{d}%}'].join(
              '\n'
            ),
            rich: {
              name: {
                color: '#909399',
                fontSize: 14,
                lineHeight: 20,
              },
              value: {
                color: '#303133',
                fontSize: 22,
                lineHeight: 40,
                fontWeight: 'bold',
              },
              percent: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                borderWidth: 0,
                backgroundColor: '#ffaa5a',
                borderRadius: 4,
                padding: [2, 4],
              },
            },
          },
          emphasis: { label: { show: true } },
          labelLine: { show: false },
          data: data.map((item) => ({
            name: `${item.tag.sign} ${item.tag.name}`,
            value: item.amount / 100,
          })),
        },
      ],
    };

    _setOptions(newOptions);
  };

  // data 变化时，更新 options
  useEffect(() => {
    setOptions(data);
  }, [data]);

  // options 变化时，更新图表
  useEffect(() => {
    myChart.current?.setOption(options);
  }, [options]);

  const resize = () => {
    myChart.current?.resize();
  };
  useEffect(() => {
    if (!pie.current) return;
    window.addEventListener('resize', resize);
    myChart.current = echarts.init(pie.current);
    myChart.current.setOption(options);

    return () => {
      myChart.current?.dispose();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div relative>
      {data.length === 0 && (
        <p
          absolute
          text-center
          w-full
          style={{ top: height ? `calc(${height} / 2)` : '15vh' }}
          text-14px
          color='#909399'
        >
          暂无数据
        </p>
      )}
      <div w-full style={{ height: height ?? '30vh' }} ref={pie} />
    </div>
  );
};
