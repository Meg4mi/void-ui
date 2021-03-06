/**
 * Replace the specified part of the path with the alias.
 */
export function toAlias(path: string, origin?: string | RegExp, alias?: string): string {
  if (origin && alias) {
    return path.replace(origin, alias);
  } else if (path.startsWith('src/')) {
    return path.replace('src/', '@void/');
  } else if (path.startsWith('docs/')) {
    return path.replace('docs/', '@docs/');
  }

  return path;
}

export function getArgv(): string[] {
  return process.argv
    .filter(arg => arg.startsWith('--'))
    .map(arg => arg.replace(/^--/, ''));
}
