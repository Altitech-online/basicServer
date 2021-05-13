import Cryptr from 'cryptr';
import config from '../config';

const { ENCRYPT_KEY } = config.get()
const cryptr = new Cryptr(ENCRYPT_KEY);

export const encryptString = (string) => {
  const encryptedString = cryptr.encrypt(string);
  return encryptedString;
};

export const decryptString = (encryptedString) => {
  const decryptedString = cryptr.decrypt(encryptedString);
  return decryptedString;
};
