import type { FC, FormEventHandler, ReactNode } from 'react';

interface Props {
  className?: string;
  onSubmit?: () => void;
  children: ReactNode;
}
export const Form: FC<Props> = ({ onSubmit, className, children }) => {
  const _onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form className={className} onSubmit={_onSubmit}>
      {children}
    </form>
  );
};
