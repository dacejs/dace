/**
 * 将相对路径转换成绝对路径
 * @param {string} file 目录或者文件
 * @return {string} 目录或者文件的绝对路径
 */

import path from 'path';

export default (file) => {
  const { DACE_PATH_ROOT = '.' } = process.env;
  if (path.isAbsolute(file)) {
    return file;
  }
  return path.resolve(DACE_PATH_ROOT, file);
};
