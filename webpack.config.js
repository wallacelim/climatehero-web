module.exports = {
    module: {
      rules: [
        {
          test: /i18n/i,
          loader: 'file-loader',
          options: {
            outputPath: 'i18n',
          },
        },
      ],
    },
  };
  