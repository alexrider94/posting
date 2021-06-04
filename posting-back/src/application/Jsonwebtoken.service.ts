const jwt = require('jsonwebtoken');

const APP_SECRET = 'jWt_(An@d-rAnDO_meS!alt';

export const getToken = function (data) {
  try {
    if (typeof data === 'undefined') {
      console.log('getToken data is empty');
      throw new Error('getToken data is empty');
    }

    const tokenizedData = jwt.sign(data, APP_SECRET);
    return tokenizedData;
  } catch (error) {
    console.log('getToken is error :' + error);
    throw error;
  }
};

export const decodeToken = function (token) {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.log('decodeToken is error :' + error);
    throw error;
  }
};
