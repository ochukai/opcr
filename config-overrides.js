/* config-overrides.js */
const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addLessLoader,
  fixBabelImports,
} = require("customize-cra");

const addWebpLoader = (loaderOptions = {}, customCssModules = {}) => config => {
  // const { module } = config;
  // const oneOf = module.rules[1].oneOf;
  // console.log('add webp loader', oneOf);

  // [ { test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ], loader: 'url-loader'} ]
  config.module.rules[1].oneOf[0].test.push(/\.webp$/);
  return config;
};

module.exports = override(
  addDecoratorsLegacy(),

  disableEsLint(),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#A80000'
      },
    },
  }),

  fixBabelImports("lodash", {
    libraryDirectory: "",
    camel2DashComponentName: false
  }),

  fixBabelImports("antd", { style: true }),

  addWebpLoader()
);
