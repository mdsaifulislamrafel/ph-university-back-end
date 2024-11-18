# Express-Typescript-eslint-prettier_setup

### express-typescript-eslint-prettier_setup
- This article will help you to instantly setup an express.js server with typescript, eslint and prettier. Follow this article to get the boilerplate, so that you can focus on building your application.

- We will be using yarn package manager in this project, you can also use npm or any other package.

# Step 1 — Initialize your project
* First of all create your project directory, and in your terminal navigate to the folder where you want to create your server and initialze with yarn.

```text 
npm init -y
```

# Step 2 — Adding TypeScript
* We need to add a typescript package in our project, so that we can use the TypeScript compiler and other related tools.

```text 
 npm i -D typescript
```

* This command will add typescript package as a dev-dependency in our project.

* Now, we need to add typescript config file, for that we will use the below given command.

```text 
tsc --init
```
* This will create a tsconfig.json file, with the default compiler configurations shown in the image below.

* In the tsconfig.json file, remove the comments on the rootDir option and modify it, to set src as root directory for typescript.

- "rootDir": "./src",

##### Similarly, do this for # outDir # option as well

- "outDir": "./dist",

* All .js files will be created in this build folder after compiling the .ts files which are inside the src folder.

* Finally, at the end of the tsconfig.json file, add these two options as well. This will tell the compiler which files are needed to be compiled.

``` text
// "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */

"skipLibCheck": true                                 /* Skip type checking all .d.ts files. */

"include": ["src/**/*.ts"],

"exclude": ["node_modules"],
 ```

* Now to check everything is working fine, create a index.ts file inside the src folder. Put some code inside it and then run it in the terminal. You can see that a index.js file is created inside the build folder.

* If you are seeing some red lines in your code, then probably you need to add a package that offers type definitions for the Node.js runtime and its modules.

``` text 
npm i -D @types/node
```

# Step 3 — Adding Eslint
* For adding eslint, we will install the required packages given below.

``` text
npm i -D eslint@9.14.0 @eslint/js @types/eslint__js typescript typescript-eslint
 ```

* Now make a eslint.config.mjs file in the root of the project director.

``` text 
npx eslint --init
```

* At this point you may see that your version of eslint: "^9.14.0" has been changed to eslint: "^9.15.0"

``` text
if that happens remove the eslint : npm remove eslint
Then re-install: npm i -D eslint@9.14.0
```

* Now add the following code inside it.
``` text 
{
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
    },
  },
```
# example with custom rules

``` text 
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
    },
  },
];
```

* Now in the terminal, you can run npm eslint . You can see that eslint is working.

* We can also add scripts for eslint in the # package.json # file.
``` text 
"scripts": {
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  },
```

# Step 4 — Adding Prettier
#### Add the prettier package in your project.

``` text
npm i -D --exact prettier
 ```

##### Now create .prettierrc and .prettierignore file in the root of your project.

##### Include basic configurations for prettier in the .prettierrc file.
``` text
{
  "semi": true,
  "singleQuote": true
}
 ```

 * Also, we need to tell prettier which files to not format So inside .prettierignore include the following.
 ``` text 
 dist
coverage
 ```

##### Finally we can add scripts for prettier as well in the package.json file.

``` text 
"format": "prettier . --write"
```

* You can run yarn format in the terminal to format your project .