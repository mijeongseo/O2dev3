module.exports = {
  compress: true,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // trailingSlash: true,
  webpack5: false,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'inline-source-map',
      plugins: [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)],
      module: { rules: [...config.module.rules, { test: /\.svg$/, use: ['@svgr/webpack'] }] },
    };
  },
};
