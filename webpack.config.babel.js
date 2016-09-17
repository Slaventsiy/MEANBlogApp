import path from 'path'; // Join paths with the right type of slash

let config = {
    entry: path.join(__dirname, 'webpack', 'index.js'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/, // Transpile all .js files from ES6 to ES5
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/, // Use style & css loaders for all .css files
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // Use the file-loader for fonts
                loaders: ['file-loader']
            }
        ]

    }
};

export default config;