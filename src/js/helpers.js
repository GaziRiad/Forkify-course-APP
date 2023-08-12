import { TIMEOUT_SEC } from './config';
import { async } from 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout.`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // const res = await ;

    const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    if (!res.ok)
      throw new Error(`We couldn't find that recipe. Please try another one!`);
    return data;
  } catch (err) {
    throw err;
  }
};

// Fetch only rejects in case of internet Lost !!
