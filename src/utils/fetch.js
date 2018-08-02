const VER = require('../../package.json').apiVer;

export default function request (url, options) {
  const defaultOptions = {
    credentials: 'include'
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/${VER}/${url.replace(/^\//, '')}`, newOptions);
    if (response.status >= 200 && response.status < 300) {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        resolve();
      } else {
        resolve(await response.json());
      }
    } else {
      reject(response.statusText);
    }
  });
}
