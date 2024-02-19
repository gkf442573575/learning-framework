import { PBKDF2, enc, lib } from 'crypto-js';

/**
 * @desc 创造密码盐
 */
export function makeSalt(): string {
  return lib.WordArray.random(128 / 8).toString(enc.Hex);
}

/**
 * 加密密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  return PBKDF2(password, salt, {
    keySize: 128 / 32,
    iterations: 300,
  }).toString(enc.Base64);
}
