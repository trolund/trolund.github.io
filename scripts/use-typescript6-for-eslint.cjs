/* eslint-disable @typescript-eslint/no-require-imports */
const Module = require('node:module');
const path = require('node:path');

const originalResolveFilename = Module._resolveFilename;
const typescript6Entry = require.resolve('@typescript/typescript6');
const eslintToolingSegments = [
  `${path.sep}typescript-eslint${path.sep}`,
  `${path.sep}@typescript-eslint${path.sep}`,
  `${path.sep}ts-api-utils${path.sep}`,
];

Module._resolveFilename = function resolveTypeScriptForEslint(
  request,
  parent,
  isMain,
  options,
) {
  if (
    request === 'typescript' &&
    eslintToolingSegments.some((segment) => parent?.filename?.includes(segment))
  ) {
    return typescript6Entry;
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};
