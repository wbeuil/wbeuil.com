module.exports = (api) => {
  const isTest = api.env('test');
  api.cache(true);

  if (isTest) {
    return {
      presets: ['next/babel'],
      plugins: ['babel-plugin-dynamic-import-node'],
    };
  }

  return {
    presets: ['next/babel'],
  };
};
