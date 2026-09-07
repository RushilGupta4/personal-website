import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'next-env.d.ts']
  },
  // Mirrors the previous `.eslintrc.json` ("extends": "next/core-web-vitals").
  // Add `eslint-config-next/typescript` here to opt into the stricter TS rules.
  ...nextCoreWebVitals
];

export default eslintConfig;
