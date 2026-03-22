import React from 'react';
import { useField } from 'formik';
import './Input.css';
import classNames from 'classnames';

interface IProps {
  label: string;
  name: string;
  type?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
}

export const Input: React.FC<IProps> = ({ label, as = 'input', rows = 4, required, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div
      className={classNames('form-input', {
        'form-input__error': meta.touched && meta.error,
      })}
    >
      <label className={classNames({ required: required })} htmlFor={props.name}>
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea {...field} id={props.name} rows={rows} />
      ) : (
        <input {...field} id={props.name} type={props.type || 'text'} />
      )}
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};
