const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'app.js'
  },

    module: {
        rules: [
            {
                test: /\.purs$/,
                use: [
                    {
                        loader: 'purs-loader',
                        options: {
                            src: [
                                'bower_components/purescript-*/src/**/*.purs',
                                'src/**/*.purs'
                            ],
                            bundle: false,
                            pscIde: false
                        }
                    }
                ]
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    },
    
    resolve: {
        modules: [ 'node_modules', 'bower_components' ],
        extensions: [ '.purs', '.ts', '.tsx', '.js' ]
    },

    plugins: [HtmlWebpackPluginConfig]
};