import path from 'path';
import fs from 'fs';
import { alertFromJSX } from './init';
const dirHome = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
const dirDesktop = path.join(dirHome, 'Desktop');

const isWin = process.platform === 'win32';

export const resolveFilePath = filePath => isWin ? path.normalize(filePath) : filePath;

export const replaceDesktop:(filePath:string)=>string = filePath => filePath.replace(/^~\/Desktop/, dirDesktop);

export const analyzeJSXPath:(filePath:string)=>string = filePath => resolveFilePath(replaceDesktop(filePath));

export const isDirectory:(filePath:string)=>Promise<boolean> = async (filePath) => {
  try {
      const stat = await fs.promises.stat(filePath);
      if (!stat.isDirectory()) {
        await alertFromJSX('drop the folder');
        return false;
      } else {
        return true;
      }
  } catch (e) {
    console.log(e);
    return false;
  }
}