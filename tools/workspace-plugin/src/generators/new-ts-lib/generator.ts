import {
  type Tree,
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  names,
  getWorkspaceLayout,
} from '@nx/devkit';
import { join } from 'path';

interface LibraryGeneratorSchema {
  name: string;
  type: string;
  domain: string;
}

function getDirectory(tree: Tree, schema: LibraryGeneratorSchema) {
  const { name, type } = schema;
  const { libsDir } = getWorkspaceLayout(tree);

  const normalizedLibraryName = names(name).fileName;
  const libType = names(type).fileName;

  const targetFolder = join(libsDir, normalizedLibraryName, libType);
  return targetFolder;
}

export default async function (tree: Tree, schema: LibraryGeneratorSchema) {
  const { name, type } = schema;
  const libType = names(type).fileName;

  const projectDirectory = getDirectory(tree, schema);
  const projectName = `${name}-${libType}`;
  const tags = `scope:${libType}`;
  const fileName = projectName;
  const { propertyName } = names(name);

  const substitutions = {
    name,
    fileName,
    libraryType: type,
    propertyNameForFile: propertyName,
    tags,
    projectDirectory,
    projectName,
    tmpl: '',
  };

  if (tree.exists(projectDirectory)) {
    throw new Error(`Lib ${projectDirectory} already exists!`);
  }

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    projectDirectory,
    substitutions
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
