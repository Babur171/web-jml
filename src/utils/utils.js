export const getAccessToken = () => {
  return JSON.parse(localStorage.getItem('accessToken'));
};

export const setAccessToken = (data) => {
  return localStorage.setItem('accessToken', data);
};

export const removeAccessToken = () => {
  return localStorage.removeItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const setRefreshToken = (data) => {
  return localStorage.setItem('refreshToken', data);
};

export const removeRefreshToken = () => {
  return localStorage.removeItem('refreshToken');
};


export const getActiveUser = () => {
  return localStorage.getItem('activeUser');
};

export const setActiveUser = (data) => {
  return localStorage.setItem('activeUser', data);
};

export const removeActiveUser = () => {
  return localStorage.removeItem('activeUser');
};

export const getOtpToken = () => {
  return JSON.parse(localStorage.getItem('otpToken'));
};

export const setOtpToken = (data) => {
  return localStorage.setItem('otpToken', JSON.stringify(data));
};

export const removeOtpToken = () => {
  return localStorage.removeItem('otpToken');
};