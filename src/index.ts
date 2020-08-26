#!/usr/bin/env node

import { existsSync } from 'fs';
import { resolve } from 'path';

import yargs from 'yargs';

import { readSvg } from './read-svg';
import { getNameOptions } from './get-name-options';
import { applyTemplates } from './apply-templates';
import { writeComponent } from './write-component';

const { input, output, selectorPrefix } = yargs.options({
  input: { type: 'string', demandOption: true },
  output: { type: 'string', default: process.cwd() },
  selectorPrefix: { type: 'string', default: 'app' },
}).argv;

async function main() {
  try {
    const absoluteInputPath = resolve(process.cwd(), input);
    if (!existsSync(absoluteInputPath)) {
      throw new Error(`Couldn't resolve input path: ${absoluteInputPath}`);
    }
    const absoluteOutputPath = resolve(process.cwd(), output);
    const svgContent = await readSvg(input);
    const nameOptions = getNameOptions(absoluteInputPath);
    const compiled = await applyTemplates({
      ...nameOptions,
      selectorPrefix,
      svgContent,
    });
    await writeComponent(compiled, absoluteOutputPath);
  } catch (e) {
    console.error('Something went wrong');
    console.log(e);
    process.exit(1);
  }
}

main();

/* Write folder */
