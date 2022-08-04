# Swing Soccer

This was developed using the [Phaser 3 Framework](https://phaser.io/phaser3) and [Parcel](https://parceljs.org/) as the web application bundler.

Check out [Phaser 3 Examples](https://github.com/photonstorm/phaser3-examples) to see examples on how to leverage Phaser 3.

## Setup to run locally

### Install Dependencies

1. (_Optional_) It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

2. Install Node.js and npm with nvm:

   1. `nvm install node`
   2. `nvm use node`

3. Install Parcel:

   1. `npm install -g parcel-bundler`

4. Install dev dependencies needed to run Swing Soccer:
   1. `npm install`

### Start

- `npm run start`
- Open your browser to [http:localhost:8000](http:localhost:8000)

## Project Configurations

### Prettier

This project uses [Prettier](https://github.com/prettier/prettier), an opinionated code formatter.
The selected configuration options can be found in the `.prettierrc` file in the root project folder.
More informations about the format options can be found [here](https://prettier.io/docs/en/options.html).

Update the `.prettierignore` file to ignore certain files and/or directories when Prettier runs formatting.

To check formatting without making changes locally: `npm run prettier-check` or `npx prettier --check .`
To apply the formatting changes locally: `npm run prettier-write` or `npx prettier --write .`

### TypeScript

The selected compiler options for each project are set in the `tsconfig.json` file.
More informations about the available options can be found [here](https://www.typescriptlang.org/tsconfig).
