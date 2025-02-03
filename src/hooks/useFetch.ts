import { useEffect, useState } from 'react';
import { select } from 'request/request';

const useFetch = ({ link }: { link: string }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getData = (params: any) => {
    const setParams = () => {
      const a = Object.keys(params).map((prop) => {
        return `${prop}=${params[prop]}`;
      });
      return a;
    };
    select({ link: `${link}${params ? `?${setParams().join('&')}` : ''}` })
      .then((res) => {
        const { data } = res.data;
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // let params = null;
    // let
    const params = null;
    getData(params);
  }, []);
  return {
    result: data,
    reload: getData,
    loading: loading,
  };
};

export default useFetch;
