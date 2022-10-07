import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testMatch: ['src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}'],
};

export default config;
