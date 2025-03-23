import { Config } from '@babel/core';

const config: Config = {
  presets: [
    'next/babel',
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
  plugins: [
  ],
};

export default config;