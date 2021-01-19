import { DEFAULT_EXTENSIONS as BABEL_DEFAULT_EXTENSIONS } from '@babel/core';
import { nodeResolve, DEFAULTS as NODE_RESOLVE_DEFAULTS } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import {
  main,
  module,
  browser,
  name,
} from './package.json';

const TS_EXTENSIONS = ['.ts', '.tsx'];

/**
 * @param {string} str
 */
const camalize = (str) => str
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: module,
      format: 'es',
      sourcemap: true,
    },
    {
      name: camalize(name),
      file: browser,
      format: 'umd',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    nodeResolve({ extensions: [...NODE_RESOLVE_DEFAULTS.extensions, ...TS_EXTENSIONS] }),
    commonjs(),
    babel({
      extensions: [...BABEL_DEFAULT_EXTENSIONS, ...TS_EXTENSIONS],
      presets: ['@babel/env', '@babel/typescript'],
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
};

export default config;
