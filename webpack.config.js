const path = require('path');

module.exports = {
    entry: {
        'example/bundle': './src/example/index.ts',
    },
    devtool: 'inline-source-map',
    mode: (process.env.NODE_ENV === 'development') ? 'development' : 'production',
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};