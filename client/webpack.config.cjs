const path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
CssMinimazerPlugins = require('css-minimizer-webpack-plugin'),
MiniCssExtractPlugin = require('mini-css-extract-plugin');

const useJs = preset => {
    let use = {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    };

    if(preset) {
        use.options.presets.push(preset);
    };

    return use;

}
module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.jsx'),
        signUp: path.resolve(__dirname, 'src/components/auth/signUp.jsx'),
        signIn: path.resolve(__dirname, 'src/components/auth/signIn.jsx'),
        admin: path.resolve(__dirname, 'src/components/admin/index.jsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
        minimizer: [
            new CssMinimazerPlugins()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'pages/main.html',
            template: path.resolve(__dirname, 'src/index.html'),
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'pages/signUp.html',
            template: path.resolve(__dirname, 'src/components/auth/signUp.html'),
            chunks: ['signUp']
        }),
        new HtmlWebpackPlugin({
            filename: 'pages/signIn.html',
            template: path.resolve(__dirname, 'src/components/auth/signIn.html'),
            chunks: ['signIn']
        }),
        new HtmlWebpackPlugin({
            filename: 'pages/admin.html',
            template: path.resolve(__dirname, 'src/components/admin/admin.html'),
            chunks: ['admin']
        }),

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: useJs()
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: useJs('@babel/preset-react')
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }    

        ]
    }

}