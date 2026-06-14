const path = require('path');

// Root metro config for monorepo. Maps hoisted packages (like @babel/runtime) so Metro can resolve them
// regardless of the working directory used by react-native CLI.
const repoRoot = __dirname;
const appRoot = path.join(repoRoot, 'apps', 'mobile');

function resolvePkg(pkgName) {
  try {
    return path.dirname(require.resolve(pkgName + '/package.json', { paths: [repoRoot] }));
  } catch (e) {
    return null;
  }
}

const extraNodeModules = {};
const babelRuntime = resolvePkg('@babel/runtime');
if (babelRuntime) extraNodeModules['@babel/runtime'] = babelRuntime;

module.exports = {
  projectRoot: appRoot,
  watchFolders: [repoRoot],
  resolver: {
    extraNodeModules,
  },
};
