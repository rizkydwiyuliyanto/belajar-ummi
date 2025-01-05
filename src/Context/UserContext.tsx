import React, { createContext } from 'react';
import userState from './userState';

type Value = {
  user?: object,
  role: string,
  setUser:React.Dispatch<React.SetStateAction<object>>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Content = createContext<null | Value>(null);
const Provider = (props: { children: React.ReactNode }) => {
  const { user, setUser } = userState();
  const value = {
    user,
    role: user.role || "",
    setUser: setUser
  };
  return <Content.Provider value={value}>{props.children}</Content.Provider>;
};

export { Provider, Content };
