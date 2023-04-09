import path from 'path';
import fs from 'fs';
import { SuccessParam, ErrorParam } from 'jsx-recived';
import { alertFromJSX, csInterface } from './init';
const dirHome = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
export const dirDesktop = path.join(dirHome, 'Desktop');
export const dirMyDocuments = path.join(dirHome, 'Documents');

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
};

type HomeDirectoryObj = SuccessParam<{
      desktop: string,
      myDocuments: string
}>

export const getJSXHomeDirectory:()=>Promise<HomeDirectoryObj|ErrorParam> = () => {
  return new Promise((resolve) => {
      csInterface.evalScript(`getHomeDirectoryPath()`,(o:string) => {
        console.log(o);
        resolve(JSON.parse(o) as HomeDirectoryObj|ErrorParam);
      });
  });
};

export class HomeDirectoryReplacer {
  desktopPath: string;
  myDocuments: string;
  constructor () {
    this.desktopPath = '^~\/Desktop';
    this.myDocuments = '~/Documents';
  }
  
  async setHomeDirectory () {
    const obj = await getJSXHomeDirectory();
    if (obj.status === 'success') {
      this.desktopPath = obj.param.desktop;
      this.myDocuments = obj.param.myDocuments;
    } else {
      await alertFromJSX('ホームディレクトリーパスが読み込めませんでした。Extensionがうまく動かない可能性があります。');
    }
  }

  replaceHomeDirectory (filePath:string):string {
    console.log('filepath directory', filePath);
    if (filePath.includes(this.desktopPath)) {
      filePath = filePath.replace(new RegExp(`^${this.desktopPath}`), dirDesktop);
    }
    if (filePath.includes(this.myDocuments)) {
      filePath = filePath.replace(new RegExp(`^${this.myDocuments}`), dirMyDocuments);
    }
    console.log(filePath);
    return resolveFilePath(filePath);
  }
};