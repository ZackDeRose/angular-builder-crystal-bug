import { CreateNodes, readJsonFile, ProjectConfiguration } from '@nx/devkit';

export const createNodes: CreateNodes = [
  '**/project.json',
  (filePath) => {
    const projectConfig = readJsonFile(filePath) as ProjectConfiguration;
    return {
      projects: {
        [projectConfig.name || '']: {
          targets: {
            foo: {
              executor: '@angular-devkit/build-angular:application',
              options: {
                outputPath: 'dist/apps/angular-builder-crystal',
                index: 'apps/angular-builder-crystal/src/index.html',
                browser: 'apps/angular-builder-crystal/src/main.ts',
                polyfills: ['zone.js'],
                tsConfig: 'apps/angular-builder-crystal/tsconfig.app.json',
                assets: [
                  'apps/angular-builder-crystal/src/favicon.ico',
                  'apps/angular-builder-crystal/src/assets',
                ],
                styles: ['apps/angular-builder-crystal/src/styles.css'],
                scripts: [],
              },
            } as any, // note the types don't allow for a builder here
          },
          root: 'apps/angular-builder-crystal',
        },
      },
    };
  },
];

console.log(
  JSON.stringify(
    createNodes[1]('apps/angular-builder-crystal/project.json', {}, {} as any)
  )
);
