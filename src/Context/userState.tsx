import { useState } from 'react';

interface IUser {
  role?: string;
}

const userState = () => {
  const getUser = () => {
    let userData: IUser = { role: '' };
    if (localStorage.getItem('user')) {
      userData = JSON.parse(localStorage.getItem('user') || "''");
    }
    return userData;
  };
  const [data, setData] = useState<IUser>(getUser() || { role: '' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveUser = (value?: object) => {
    if (Object.keys(value || {}).length === 0) {
      localStorage.removeItem('user');
      setData({ role: '' });
      return;
    }
    // console.log(value);
    localStorage.setItem('user', JSON.stringify(value));
    setData(value || { role: '' });
  };
  return {
    user: data,
    setUser: saveUser,
  };
};

export default userState;
