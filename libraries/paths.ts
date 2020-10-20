function fileBasename(filePath: string) {
  return filePath.split("/").slice(-1).pop();
}

export function getFileType(fileName: string, numfileTypes = 1) {
  const delimiter = ".";
  const fileParts = fileBasename(fileName)?.split(delimiter);
  if (!fileParts || fileParts.length < 2) return "";
  const [, ...fileTypes] = fileParts;
  if (!numfileTypes) {
    return fileTypes.join(delimiter);
  }
  return fileTypes
    .slice(Math.max(fileTypes.length - numfileTypes, 0))
    .join(delimiter);
}

export function isAbsolutePath(p: string) {
  return p && /^(?:[a-z]+:)?\/\//i.test(p);
}

export function normalisePath(p: string) {
  try {
    return new URL(p).href;
  } catch (e) {
    const fakeProtocol = "x://";
    return new URL(`${fakeProtocol}${p}`).href.substr(fakeProtocol.length);
  }
}

export function fileDirname(filePath: string) {
  return filePath.substring(0, filePath.lastIndexOf("/"));
}
