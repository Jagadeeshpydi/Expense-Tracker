const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle file
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
        },
      },
      // Add other rules as needed
    ],
  },
  plugins: [
    // Add plugins here if needed
  ],
  performance: {
    hints: false, // Disables performance hints like file size warnings
  },
  ignoreWarnings: [
    {
      module: /node_modules\/some-module/, // Specify the module to ignore warnings from
      message: /Some warning message/, // Optional regex pattern to match the warning message
    },
  ],
};
