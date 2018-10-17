const path = require('path');

module.exports = {
    entry: './src/index.ts',
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
        filename: 'indexed-mongo.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'IndexedMongo'
    }
};