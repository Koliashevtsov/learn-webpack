const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {

  const { mode = 'development' } = env;

  const isProd = mode == 'production';
  const isDev = mode == 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ];
  }

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        buildTime: new Date().toString(),
        template: 'public/index.html'
      })
    ];
    if (isProd){
      plugins.push(new MiniCssExtractPlugin({
        filename: 'main-[hash:8].scc'
      }))
    }
    return plugins;
  }

  return {
    mode: isProd ? 'production' : isDev && 'development',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Loading scc
        {
          test: /\.css$/,
          use: getStyleLoaders()
        },
        // Loading sass/scss
        {
          test: /\.(s[ca]ss)$/,
          use: [ ...getStyleLoaders(), 'sass-loader' ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: getPlugins(),
    devServer: {
      open: true
    }
  };

}
