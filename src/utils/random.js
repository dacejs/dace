/**
 * 返回指定长度的随机数
 * @param {number} 随机数的位数，默认为个位数
 * @return {number} 随机数
 */

/* eslint no-restricted-properties: 0 */
export default (digit = 1) => {
  const min = Math.pow(10, digit - 1);
  const max = Math.pow(10, digit);

  return Math.floor(Math.random() * (max - min)) + min;
};
