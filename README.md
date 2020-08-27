# GASC - Generate Angular SVG Component

This is a commandline tool which generates an [Angular component](https://angular.io/guide/svg-in-templates) from a SVG source file

## Install

Install from npm as package `gasc`

```
yarn global add gasc
npm install -g gasc
volta install gasc
```

## Usage

```
gasc --input smiley.svg
```

This will generate this file structure:

```
smiley/
  smiley.component.svg
  smiley.component.ts
```

## Parameters

| Parameter        | Description                                                                                                | Required | Default Value    |
|------------------|------------------------------------------------------------------------------------------------------------|:--------:|------------------|
| --input          | path to a SVG file. Wildcards aren't supported                                                             |    x     | -                |
| --output         | path to the output directory                                                                               |          | working directoy |
| --selectorPrefix | the used [selector prefix](https://angular.io/guide/styleguide#component-selectors) in your apps templates |          | `app`            |
