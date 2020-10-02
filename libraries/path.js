function isAbsolutePath(p) {
  return p && /^(?:[a-z]+:)?\/\//i.test(p);
}

function normalisePath(p) {
  try {
    return new URL(p).href;
  } catch (e) {
    const fakeProtocol = "x://";
    return new URL(`${fakeProtocol}${p}`).href.substr(fakeProtocol.length);
  }
}

function fileDirname(filePath) {
  return filePath.substring(0, filePath.lastIndexOf("/"));
}

function fileBasename(filePath) {
  return filePath.split("/").slice(-1).pop();
}

function getFileType(fileName, numfileTypes = 1) {
  const delimiter = ".";
  const [, ...fileTypes] = fileBasename(fileName).split(delimiter);
  if (fileTypes.length === 0) return null;
  if (!numfileTypes) {
    return fileTypes.join(delimiter);
  }
  return fileTypes
    .slice(Math.max(fileTypes.length - numfileTypes, 0))
    .join(delimiter);
}
