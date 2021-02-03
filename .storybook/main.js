const path = require('path');
const fs = require('fs');

// const includes = [
//   fs.realpathSync(`./src`),
//   fs.realpathSync(`./node_modules/@meracan/react-component`),
//   // SYMLINK PROJECT------>fs.realpathSync(`${__dirname}/node_modules/{NAME}`),
// ];

// Export a function. Accept the base config as the only param.
module.exports = {
 stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"

  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    
    // config.module.rules.push({ test: /\.js$/,include: includes,use:[{ loader: 'babel-loader' }]})
    
    // config.externals= {...config.externals,      
    //     "@deck.gl/react": {          
    //         commonjs: "@deck.gl/react",          
    //         commonjs2: "@deck.gl/react",          
    //         amd: "@deck.gl/react",          
    //         root: "@deck.gl/react"      
    //     }          
    // }, 
    config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./src'),
    ];


    // Return the altered config
    return config;
  },
};