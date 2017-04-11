import { fetchUserSelector } from '../../client/modules/Login/LoginReducer';

export const randomString = () => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let stringLength = 5;
  let randomString = '';
  for (let i = 0; i < stringLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(randomNumber, randomNumber + 1);
  }

  return randomString;
};

const attachToken = (state) => {
  const { token } = fetchUserSelector(state);
  const fullToken = randomString() + '13792ddfc14f18213c8f15e4b02f5d32' + token;
  return {
    Authorization: fullToken,
    'Content-Type': 'application/json',
  };
};

export default attachToken;
