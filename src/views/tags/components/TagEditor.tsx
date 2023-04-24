import type { Partial } from '@react-spring/web';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';
import { useApi } from '../../../api/useApi';
import { Form, Input } from '../../../components';
import { emojis } from '../../../lib/emojis';
import { hasError, validate } from '../../../lib/validate';
import type { Rules } from '../../../lib/validate';
import { useEditTagStore, useToastStore } from '../../../stores';

const rules: Rules<Partial<TagModel>> = [
  {
    key: 'name',
    type: 'required',
    message: '标签名不能为空',
  },
  {
    key: 'name',
    type: 'length',
    max: 6,
    message: '标签名最多 6 个字符',
  },
];

interface Props {
  type: 'new' | 'edit';
}

export const TagEditor: FC<Props> = ({ type }) => {
  const nav = useNavigate();
  const { api } = useApi();
  const { data, errors, setData, setErrors, resetData } = useEditTagStore();
  const [urlSearchParams] = useSearchParams();
  const { id } = useParams();

  // 新建标签
  useEffect(() => {
    if (type !== 'new') return;
    const kind = urlSearchParams.get('kind');
    if (!kind) {
      throw new Error('kind is required');
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind must be expenses or income');
    }

    const index = Math.floor(Math.random() * emojis[0].signs.length);
    setData({ sign: emojis[0].signs[index], kind });
  }, [type, urlSearchParams]);

  // 编辑标签
  const { data: tag } = useSWRImmutable(
    type === 'edit' && id ? `tag_${id}` : null,
    () => api.tag.getTag(Number(id))
  );
  useEffect(() => {
    if (type !== 'edit' || !tag) return;
    const { resource } = tag.data;
    setData(resource);
  }, [tag, type]);

  const deleteTime = useRef(0);
  const onClickDelete = async () => {
    if (!data.id) {
      return openToast({
        text: 'ID 不能为空',
        type: 'error',
        duration: 800,
      });
    }

    // 确认删除
    if (deleteTime.current < 1) {
      deleteTime.current++;
      return openToast({
        text: '删除后不可恢复！再次点击以确认删除',
        type: 'error',
      });
    }

    await api.tag.deleteTag(data.id);
    openToast({
      text: '删除成功',
      type: 'success',
      duration: 800,
    });
    nav(-1);
    resetData(); // 成功后重置数据
  };

  const { openToast } = useToastStore();
  const onSubmit = async () => {
    const newError = validate(data, rules);
    setErrors(newError);
    if (!hasError(newError)) {
      try {
        if (type === 'new') await api.tag.createTag(data);
        if (type === 'edit') await api.tag.updateTag(data);
        openToast({
          text: type === 'new' ? '创建成功' : '更新成功',
          type: 'success',
          duration: 800,
        });
        nav(-1);
        resetData(); // 成功后重置数据
      } catch (e) {}
    }
  };

  return (
    <Form
      className='flex-1 flex flex-col px-16px pb-16px overflow-auto'
      onSubmit={onSubmit}
    >
      <Input
        type='text'
        align='center'
        labelWidth='0'
        placeholder='请输入标签名'
        value={data.name}
        onChange={(name) => setData({ name })}
        errors={errors.name}
      />

      <div flex-1 flex flex-col overflow-auto gap-8px>
        <Input
          type='emoji'
          value={data.sign}
          onChange={(sign) => setData({ sign })}
        />
        <p text-center text-12px color='#909399'>
          tips：记账页标签列表可长按编辑标签
        </p>
      </div>

      <button pp-btn-primary mt-24px type='submit'>
        保存
      </button>
      {type === 'edit' && (
        <button
          pp-btn-info
          mt-24px
          type='button'
          onClick={() => onClickDelete()}
        >
          删除
        </button>
      )}
    </Form>
  );
};
