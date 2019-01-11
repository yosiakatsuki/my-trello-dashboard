module.exports = {
    mode: 'development',
    entry: {
        script: './src/js/script.js'
    },
    devtool: 'source-map',
    output: {
        path: `${__dirname}/js`,
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
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
                        presets: [
                            'babel-preset-env',
                            'babel-preset-minify'
                        ]
                    }
                }
            }
        ]
    }
};