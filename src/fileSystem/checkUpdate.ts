import fs from 'fs';
import { ImageFullNames } from 'jsx-recived';

const getUpdateTime:(filePath:string)=>Promise<Date> = async filePath => {
    const stat = await fs.promises.stat(filePath);
    return stat.mtime;
}

export const updateCheck = async ({
    doc,
    placeFullNames
}: ImageFullNames['param']):Promise<boolean> => {
    const documentDate = await getUpdateTime(doc);
    const names = placeFullNames.filter(name => fs.existsSync(name));
    const filePathDates = await Promise.all(names.map(async (fileNamePath) => {
        return await getUpdateTime(fileNamePath);
    }))
    const flag = filePathDates.some(fileDate => {
        console.log(fileDate);
        return fileDate > documentDate;
    });
    return flag;
};
