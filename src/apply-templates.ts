import { default as fsWithCallbacks } from 'fs';
import { resolve } from 'path';

import { getNameOptions } from './get-name-options';

const fs = fsWithCallbacks.promises;

type Iparams = ReturnType<typeof getNameOptions> & { selectorPrefix: string; svgContent: string };

let componentTemplate = ({
  paramCase,
  pascalCase,
  selectorPrefix,
}: Iparams) => `import { Component } from "@angular/core";

@Component({
  selector: "${selectorPrefix}-${paramCase}",
  templateUrl: "./${paramCase}.component.svg",
  styleUrls: []
})
export class ${pascalCase} {
};`;

export async function applyTemplates(templateParams: Iparams) {
  const componentContent = componentTemplate(templateParams);

  return {
    dirName: templateParams.paramCase,
    componentFileName: `${templateParams.paramCase}.component.ts`,
    componentContent,
    svgFileName: `${templateParams.paramCase}.component.svg`,
    svgContent: templateParams.svgContent,
  };
}
