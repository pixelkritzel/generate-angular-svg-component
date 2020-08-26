import { applyTemplates } from './apply-templates';
import { UnwrapPromise } from './unwrap-promise';
import { default as fsWithCallbacks } from 'fs';
import { promisify } from 'util';

import rimraf from 'rimraf';
import prompts from 'prompts';
const fs = fsWithCallbacks.promises;

export async function writeComponent(
  compiled: UnwrapPromise<ReturnType<typeof applyTemplates>>,
  outputDir: string
) {
  const componentDirectory = `${outputDir}/${compiled.dirName}`;
  if (fsWithCallbacks.existsSync(componentDirectory)) {
    const response = await prompts({
      type: 'confirm',
      name: 'value',
      message: `It appears there is already a directory at \n${componentDirectory}\n Do you want to overwrite it?`,
    });
    if (response.value) {
      await promisify(rimraf)(componentDirectory);
    } else {
      return;
    }
  }
  await fs.mkdir(componentDirectory, { recursive: true });
  await fs.writeFile(
    `${componentDirectory}/${compiled.componentFileName}`,
    compiled.componentContent,
    { encoding: 'utf-8' }
  );
  await fs.writeFile(
    `${componentDirectory}/${compiled.componentFileName}`,
    compiled.componentContent,
    { encoding: 'utf-8' }
  );
  await fs.writeFile(`${componentDirectory}/${compiled.svgFileName}`, compiled.svgContent, {
    encoding: 'utf-8',
  });
}
