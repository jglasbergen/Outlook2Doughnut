// load the needed node modules
var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
 
// webpack project settings
module.exports = {
  context: __dirname,
  entry: {
          analysepage: './reactcomp/analyse/index.jsx',
          trendpage: './reactcomp/trend/index.jsx',
          login: './reactcomp/login/index.js',
          beheerpage: './reactcomp/beheer/index.jsx'
  },
  output: {
      path: path.resolve('./backend/static/bundles/'),
      filename: "[name]-bundle.js",
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json'
  },
 
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({path: __dirname, filename: './webpack-stats.json'})
 
  ],
 
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
  
    ]
},
 
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
}