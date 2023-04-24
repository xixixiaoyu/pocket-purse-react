import type { FC } from 'react';
import { TopNav, TopNavGradient } from '../../components';
import { useEditTagStore } from '../../stores';
import { TagEditor } from './components/TagEditor';

interface Props {
  type: 'edit' | 'new';
  title: string;
}

export const EditTag: FC<Props> = ({ type, title }) => {
  const { data } = useEditTagStore();

  return (
    <div pp-page-wrapper>
      <TopNavGradient disableShadow={true}>
        <TopNav title={title} />
      </TopNavGradient>

      <div flex justify-center mb-16px>
        <span
          h-96px
          w-96px
          bg='#0000000f'
          rounded-48px
          text-center
          leading-96px
          text-48px
        >
          {data.sign}
        </span>
      </div>

      <TagEditor type={type} />
    </div>
  );
};
