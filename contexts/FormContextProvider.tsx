import React from 'react';

export const FormContext = React.createContext<HTMLFormElement | null>(null);

type FormContextProviderProps = {
  children?: React.ReactNode;
  form: HTMLFormElement | null;
};

export const FormContextProvider = ({ form, ...props }: FormContextProviderProps) => {
  return <FormContext.Provider value={form} {...props} />;
};
