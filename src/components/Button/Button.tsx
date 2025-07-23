import React, { ButtonHTMLAttributes, FC } from 'react';
import './Button.css';
import { Loader } from '../Loader/Loader';
import cn from 'classnames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  kind?: 'primary' | 'secondary';
}

export const Button: FC<IProps> = ({ children, isLoading, disabled, kind = 'primary', className, ...props }) => {
  const renderChildren = () => {
    if (typeof children === 'string') {
      return children.toUpperCase(); // Перетворення на великий регістр
    }
    return children;
  };

  return (
    <button
      {...props}
      className={cn(className, 'button', kind, {
        'disabled': disabled
      })}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Loader /> : renderChildren()}
    </button>
  );
};