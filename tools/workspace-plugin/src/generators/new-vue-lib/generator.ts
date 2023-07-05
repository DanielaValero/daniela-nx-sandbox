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
  domain?: string;
  isShared: boolean;
}

function getDirectory(tree: Tree, schema: LibraryGeneratorSchema) {
  const { domain, isShared } = schema;

  let dir = isShared ? 'shared' : '';
  if (domain && !isShared) {
    dir = names(domain).fileName;
  }
  return dir;
}
export default async function (tree: Tree, schema: LibraryGeneratorSchema) {
  const { name, type, isShared } = schema;

  if (isShared && type === 'feat') {
    throw new Error('Shared lib cant be feat');
  }

  const packageName = names(name).fileName;
  const libType = names(type).fileName;

  const dir = getDirectory(tree, schema);
  const { libsDir } = getWorkspaceLayout(tree);
  const targetFolder = join(
    libsDir,
    dir,
    !isShared ? packageName : '',
    libType
  );

  const substitutions = {
    name: name,
    type: type,
    dir: targetFolder,
    projectName: `${name}-${type}`,
    tmpl: '',
  };

  if (tree.exists(targetFolder)) {
    throw new Error(`Lib ${targetFolder} already exists!`);
  }

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    targetFolder,
    substitutions
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
