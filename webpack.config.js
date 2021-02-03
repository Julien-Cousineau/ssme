const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const fs = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const includes = [
  fs.realpathSync(`${__dirname}/src`),
  // SYMLINK PROJECT------>fs.realpathSync(`${__dirname}/node_modules/{NAME}`),
];
 

const title=process.env.TITLE || "Title";
const isTesting=process.env.TESTING || false;

const copy = new CopyPlugin({
      patterns: [
        { from: 'public', to: '' },
      ],
    });

const htmlPage = new HtmlWebpackPlugin({title,template:'./public/index.html'});
  
const analyzer=new BundleAnalyzerPlugin({analyzerPort:8080});

const plugins=isTesting?[htmlPage,copy,analyzer]:[htmlPage,copy];
    
module.exports = {
  entry: './src/index.js',
   output: {
    // filename: 'index.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // mode:'development',
  mode:'production',
  // devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.js$/,include:includes,exclude: /node_modules/,use:[{ loader: 'babel-loader' }]},
      { test: /\.css$/,use: ['style-loader', 'css-loader'],},
      { test: /\.(png|jpg|gif|slf|mp4|ttf|svg)$/,use: [{loader: 'file-loader',options: {name: 'assets/[name].[ext]'}}]},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,use: [{loader: 'file-loader?mimetype=image/svg+xml',options: {name: 'assets/[name].[ext]'}}]},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,use: [{loader: 'file-loader?mimetype=application/font-woff',options: {name: 'assets/[name].[ext]'}}]}, 
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,use: [{loader: 'file-loader?mimetype=application/font-woff',options: {name: 'assets/[name].[ext]'}}]},
    ]
  },
  
  node: {
    fs: "empty"
  },

  optimization: {
     splitChunks: {
       chunks: 'all',
     },
      minimizer: [
        new TerserPlugin({
          sourceMap: false, // Must be set to true if using source-maps in production
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      
		
  },
  plugins,
  resolve: {
    modules:[path.resolve('./node_modules'),path.resolve('./src')],
  },
};