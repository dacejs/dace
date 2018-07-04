/**
 * 该文件为 target='web' 提供文件系统操作能力
 * 当  target='web' 时，`require('./routes')` 返回的内容为该 loader 返回的内容
 */
import { resolve } from 'path';
import glob from 'glob';

export default (self) => {
  // console.log('--self:', self);
  const { rootContext = process.cwd() } = self;
  console.log('--rootContext: ', rootContext);
  const cwd = resolve(rootContext, 'src/pages');
  const pages = glob
    .sync('**/index.js', { cwd })
    .map(item => item.replace('/index.js', ''));

  return { cwd, pages };
};
