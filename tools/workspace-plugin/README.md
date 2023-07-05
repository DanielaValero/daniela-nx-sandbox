# Generators

Plugin for generators

## VSCode extension

If you are using VSCode, it is strongly recommended to use the NX extension. The extension should already be recommended in `.vscode/extensions.json`.

## For vue libs: new-vue-lib

This generator will create a new `vue` library with our project's defaults. In order to use it, you can run the command:

```sh
npx nx generate workspace-plugin:new-vue-lib
```

```sh
npx nx generate workspace-plugin:new-vue-lib --dry-run  --verbose
```

#### Optional parameters

- `name`: The name of the library. For shared add: "shared"
- `type`: Library type. One of: feat, data, util, ui
- `isShared`: if the lib is shared. Note: Shared can't be feat.

You can also use `--dry-run` in order to check the files that'll be generated without performing any writes.


## For TS libs: new-ts-lib

This generator will create a new `ts` library with our project's defaults. In order to use it, you can run the command:

```sh
npx nx generate workspace-plugin:new-ts-lib
```

```sh
npx nx generate workspace-plugin:new-ts-lib --dry-run  --verbose
```

#### Optional parameters

- `name`: The name of the library. For shared add: "shared"
- `type`: Library type. One of: data or util

You can also use `--dry-run` in order to check the files that'll be generated without performing any writes.
