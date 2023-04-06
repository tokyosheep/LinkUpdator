import fs from 'fs';
import { analyzeJSXPath } from './resolveFile';
import { ImageFullNames } from 'jsx-recived';

const getUpdateTime:(filePath:string)=>Promise<Date> = async filePath => {
    const stat = await fs.promises.stat(filePath);
    return stat.mtime;
}

export const updateCheck = async ({
    doc,
    placeFullNames
}: ImageFullNames['param']):Promise<boolean> => {
    const docFullName = analyzeJSXPath(doc);
    const documentDate = await getUpdateTime(docFullName);
    const filePathDates = await Promise.all(placeFullNames.map(async (fileNamePath) => {
        return await getUpdateTime(analyzeJSXPath(fileNamePath));
    }))
    const flag = filePathDates.some(fileDate => {
        console.log(fileDate);
        return fileDate > documentDate;
    });
    return flag;
};
