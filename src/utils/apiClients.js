import axios, { AxiosError } from 'axios';
import config from '../config';
const apiUrl = `${config.baseUrl}/api/v1`;
const axiosApi = axios.create({ baseURL: apiUrl });
import { getAccessToken } from '../utils/utils';

function setConfigs() {
  const accessTokenObject = getAccessToken();
  const obj = {
    headers: {
      authorization: `Bearer ${accessTokenObject.token}`,
    },
  };
  return obj;
}

const get = async function (url, hasAuth = true) {
  try {
    let config;
    if (hasAuth) {
      config = setConfigs();
    }
    const { data } = await axiosApi.get(url, { ...config });
    return { success: true, data };
  } catch (error) {
    const err = error;
    return { success: false, data: err.response?.data || err };
  }
};

const post = async function (url, reqBody, hasAuth = true) {
  try {
    let config;
    if (hasAuth) {
      config = setConfigs();
    }
    const { data } = await axiosApi.post(
      url,
      { ...reqBody },
      {
        ...config,
      }
    );
    return { success: true, data };
  } catch (error) {
    const err = error;
    return { success: false, data: err.response?.data || err };
  }
};

const put = async function (url, reqBody, hasAuth = true) {
  try {
    let config;
    if (hasAuth) {
      config = setConfigs();
    }
    const { data } = await axiosApi.put(
      url,
      { ...reqBody },
      {
        ...config,
      }
    );
    return { success: true, data };
  } catch (error) {
    const err = error;
    return { success: false, data: err.response?.data || err };
  }
};

const patch = async function (
  url,
  reqBody,
  hasAuth = true
) {
  try {
    let config;
    if (hasAuth) {
      config = setConfigs();
    }
    const { data } = await axiosApi.patch(
      url,
      { ...reqBody },
      {
        ...config,
      }
    );
    return { success: true, data };
  } catch (error) {
    const err = error;
    return { success: false, data: err.response?.data || err };
  }
};

const del = async function (url, hasAuth = true) {
  try {
    let config;
    if (hasAuth) {
      config = setConfigs(config);
    }
    const { data } = await axiosApi.delete(url, {
      ...config,
    });
    return { success: true, data };
  } catch (error) {
    const err = error;
    return { success: false, data: err.response?.data || err };
  }
};

export default {
  get,
  post,
  put,
  patch,
  del,
};
