// eslint-disable-next-line @typescript-eslint/no-var-requires
const lookupFiles = require('mocha/lib/cli/lookup-files');

export default function getFilesList(rest: string[], extensions: string[], recursive: boolean): string[] {
  const filesList = rest.length ? rest : ['test'];
  const output: string[] = [];

  for (const file of filesList) {
    try {
      const newFiles = lookupFiles(file, extensions, recursive) as string[] | string;
      const newFilesList = Array.isArray(newFiles) ? newFiles : [newFiles];

      output.push(...newFilesList);
    } catch (err) {
      if (err.message.startsWith('cannot resolve path')) {
        // eslint-disable-next-line no-console
        console.error(`Warning: Could not find any test files matching pattern: ${file}`);
        continue;
      }

      throw err;
    }
  }

  return output;
}
