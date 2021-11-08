import { FieldProps } from 'formik';
import React from 'react';
import { Toggle } from './Toggle';

export const FormikToggle: React.FC<FieldProps> = ({ field }) => {
  return (
    <Toggle checked={field.checked as boolean} onChange={field.onChange} />
  );
};
