/* eslint-disable no-useless-catch */
import axios from 'axios';

// const url = "http://localhost/react-quiz-be"
// const url = "https://limegreen-skunk-216580.hostingersite.com"
const url = "https://react-quiz-be.fun"

const instance = axios.create({
  baseURL: url,
});

interface Request {
  data?: object;
  link: string;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showImage = ({ filePath }: { filePath: string }) => {
  return `${url}/${filePath}`;
}

const signIn = async ({ data, link }: Request) => {
  try {
    const res = await instance.post(link, JSON.stringify(data));
    return res;
  } catch (err) {
    throw err;
  }
};

const create = async ({ data, link }: Request) => {
  try {
    const res = await instance.post(link, JSON.stringify(data));
    return res;
  } catch (err) {
    throw err;
  }
};

const inputBaris = async ({ link, formData }: Request) => {
  try {
    const res = await instance.post(link, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const inputFoto = async ({ formData, link, id }: Request) => {
  try {
    const res = await instance.post(link + '/' + id, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const update = async ({ data, link, id }: Request) => {
  try {
    const res = await instance.post(link + '/' + id, JSON.stringify(data));
    return res;
  } catch (err) {
    throw err;
  }
};

const remove = async ({ link, id }: Request) => {
  try {
    const res = await instance.post(link, JSON.stringify({ id: id }));
    return res;
  } catch (err) {
    throw err;
  }
};

const selectId = async ({ link, id }: Request) => {
  try {
    const res = await instance.get(link + '/' + id);
    return res;
  } catch (err) {
    throw err;
  }
};

const select = async ({ link }: Request) => {
  try {
    const res = await instance.get(link);
    // console.log(res);
    return res;
  } catch (err) {
    throw err;
  }
};

export { signIn, create, select, selectId, update, remove, inputFoto, showImage, inputBaris, url };
