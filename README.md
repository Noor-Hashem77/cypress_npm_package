# What is this?

## Work in progress. Cypress npm package for cypress common function. No more copy and paste!

### How to use.

For now, use `npm link` to link the package to repo.
Ensure package is added to package.json
Ensure package is added to the `index.ts` file in support folder of cypress project --> `import 'cypress_npm_package'`;
Ensure that in the `tsconfig.json` file you add: `"cypress_npm_package"` to the types array
