/* eslint no-case-declarations: 0 */

const { join, resolve } = require('path');
const glob = require('glob');
// const syntax = require('babel-plugin-syntax-dynamic-import');

const defaultOptions = {
  redirectPattern: '__CONFIG__',
  pagesPattern: '__PAGES__',
  pagesRoot: 'src/pages',
  context: process.cwd()
};

module.exports = function babelPluginUnjs({ /* template, */ types: t }) {
  // const buildImport = template(`
  //   (function() { const component = require(SOURCE); return component.default || component; })()
  // `);

  return {
    name: 'babel-plugin-unjs',
    // inherits: syntax,
    visitor: {
      VariableDeclaration(path) {
        const {
          redirectPattern,
          pagesPattern,
          pagesRoot,
          context
        } = {
          ...defaultOptions,
          ...this.opts
        };

        const { declarations } = path.node;
        if (declarations.length > 0) {
          const firstDeclaration = declarations[0];
          const { init } = firstDeclaration;
          const { name } = firstDeclaration.id;
          if (init && init.callee) {
            const { name: calleeName } = init.callee;
            // console.log('--name:', constName);
            // console.log('--calleeName:', calleeName);
            // console.log('--value:', value);

            if (calleeName === 'require') {
              const {
                arguments: [{ value }]
              } = init;
              switch (true) {
                case pagesPattern === value:
                  const cwd = resolve(context, pagesRoot);
                  const pages = glob
                    .sync('**/index.js', { cwd })
                    .map(item => t.stringLiteral(item.replace('/index.js', '')));

                  const a = t.variableDeclaration('var', [
                    t.VariableDeclarator(
                      t.Identifier(name),
                      t.ObjectExpression([
                        t.objectProperty(t.stringLiteral('cwd'), t.stringLiteral(cwd)),
                        t.objectProperty(t.stringLiteral('pages'), t.ArrayExpression(pages))
                      ])
                    )
                  ]);
                  path.insertBefore(a);
                  path.remove();
                  break;
                case new RegExp(redirectPattern).test(value):
                  const newValue = join(context, value.replace(redirectPattern, ''));
                  init.arguments[0].value = newValue;
                  break;
                default:
              }
            }
          }
        }
      },

      ImportDeclaration(path) {
        const {
          redirectPattern,
          pagesPattern,
          pagesRoot,
          context
        } = {
          ...defaultOptions,
          ...this.opts
        };
        const { specifiers, source: { value } } = path.node;
        const { name } = specifiers[0].local;

        if (pagesPattern === value) {
          const cwd = resolve(context, pagesRoot);
          const pages = glob
            .sync('**/index.js', { cwd })
            .map(item => t.stringLiteral(item.replace('/index.js', '')));

          const a = t.variableDeclaration('var', [
            t.VariableDeclarator(
              t.Identifier(name),
              t.ObjectExpression([
                t.objectProperty(t.stringLiteral('cwd'), t.stringLiteral(cwd)),
                t.objectProperty(t.stringLiteral('pages'), t.ArrayExpression(pages))
              ])
            )
          ]);
          path.insertBefore(a);
          path.remove();
        }

        if (new RegExp(redirectPattern).test(value)) {
          // 到 app 目录取配置文件
          const redirect = join(context, value.replace(redirectPattern, ''));
          const redirectImport = t.importDeclaration(
            [t.importDefaultSpecifier(t.Identifier(name))],
            t.stringLiteral(redirect)
          );
          path.insertBefore(redirectImport);
          path.remove();
        }
      } // ,

      // Import(path) {
      //   const importArguments = path.parentPath.node.arguments;
      //   const isString = t.isStringLiteral(importArguments[0])
      //     || t.isTemplateLiteral(importArguments[0]);
      //   if (isString) {
      //     t.removeComments(importArguments[0]);
      //   }
      //   const newImport = buildImport({
      //     SOURCE: (isString)
      //       ? importArguments
      //       : t.templateLiteral([t.templateElement({ raw: '', cooked: '' }),
      // t.templateElement({ raw: '', cooked: '' }, true)], importArguments)
      //   });
      //   if (path.parentPath &&
      //     path.parentPath.parentPath &&
      //     path.parentPath.parentPath.parentPath &&
      //     path.parentPath.parentPath.parentPath.node &&
      //     path.parentPath.parentPath.parentPath.node.callee &&
      //     path.parentPath.parentPath.parentPath.node.callee.name === 'asyncComponent') {
      //     path.parentPath.parentPath.parentPath.replaceWith(newImport);
      //   }
      // }
    }
  };
};
