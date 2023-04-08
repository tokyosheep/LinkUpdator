const path = require("path");
const fs = require("fs");

const dirHome = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
const dirDesktop = path.join(dirHome, 'Desktop');
const dirMyDocuments = path.join(dirHome, 'Documents');

const desktopPath = "~/Desktop";

const replaceDesktop = filePath => filePath.replace(new RegExp(`^${desktopPath}`), dirDesktop);

console.log(replaceDesktop('~/Desktop/junjun'));