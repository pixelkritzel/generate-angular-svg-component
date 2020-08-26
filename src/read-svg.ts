import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;

function cleanSVG(fileContent: string) {
  return fileContent.replace('<?xml version="1.0" encoding="UTF-8"?>', '').trim();
}

export async function readSvg(svgPath: string) {
  const fileContent = await fs.readFile(svgPath, { encoding: 'utf-8' });
  return cleanSVG(fileContent);
}
