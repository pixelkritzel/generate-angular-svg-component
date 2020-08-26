import { basename } from 'path';
import { paramCase, pascalCase } from 'change-case';

export function getNameOptions(path: string) {
  const svgName = basename(path, '.svg');
  return {
    paramCase: paramCase(svgName),
    pascalCase: pascalCase(svgName),
  };
}
