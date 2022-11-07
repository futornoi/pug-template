const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = () => new CopyPlugin({
  patterns: [
    {
      from: "./src/assets",
      to: "../dist/assets",
      filter: async (resourcePath) => {
        const imageDirName = path.dirname(resourcePath).split(path.sep).pop();

        if(imageDirName === 'images') {
          return false
        }

        return true;
      },
    },
  ],
})