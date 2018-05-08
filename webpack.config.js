const webpack = require('webpack');
const path = require('path');

const names = ['game', 'login'];

const createConfig = (name) => {
  return {
    entry: path.join(__dirname, `/client/${name}/index.jsx`),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'env'],
          },
        },
        {
          test: /\.css$/,
          loader: 'style-loader',
        }, {
          test: /\.css$/,
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      ],
    },
    output: {
      path: path.join(__dirname, '/public/dist'),
      filename: `bundle_${name}.js`,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
    },
    mode: 'development',
  };
};

module.exports = names.map(name => createConfig(name));
