import type { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorageStore } from '../stores';

const Root: FC = () => {
  // 如果已经阅读过欢迎页，就跳转到首页，否则跳转到欢迎页
  const { hasRead } = useLocalStorageStore();
  if (hasRead) {
    return <Navigate to={'/home'} replace={true} />;
  } else {
    return <Navigate to={'/welcome/1'} replace={true} />;
  }
};

export default Root;
