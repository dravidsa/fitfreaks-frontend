const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'dompurify': path.resolve(__dirname, 'node_modules/dompurify/dist/purify.es.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  // Other configurations like entry, output, plugins, etc.
};
