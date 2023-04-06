import fs from 'fs';
import path from 'path';
export const csInterface = new CSInterface();
//const appID = csInterface.getApplicationID();
export const extensionId = csInterface.getExtensionID();
export const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
const jsxParts = `${extensionRoot}/parts`;

const preventDragEvent = () =>{
    window.addEventListener(`drop`,prevent_dragnaddrop,false);
    
    window.addEventListener(`dragover`,prevent_dragnaddrop,false);
    
    function prevent_dragnaddrop(e){
        e.stopPropagation();
        e.preventDefault();
    }
}

const reload = () =>{
    csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",()=>{location.reload(true)},false);
}

const loadJsx = async(jsxFolder) =>{
    const parts = await fs.promises.readdir(jsxFolder).catch(e=>console.log(e));
    console.log(parts);
    const jsxes = parts.filter(f => path.extname(f) === ".jsx" || path.extname(f) === ".js");
    jsxes.forEach(jsx =>  csInterface.evalScript(`$.evalFile("${jsxFolder}/${jsx}")`));
}

export const init = async () => {
    console.log(ISDEBUG);
    preventDragEvent();
    if (ISDEBUG) reload();
    await loadJsx(jsxParts);
};

export const alertFromJSX = msg => {
    return new Promise(resolve => {
        csInterface.evalScript(`$.evalFile(alert("${msg}"))`,() => {
            resolve();
        })
    })
};

export const switchPreview = () => {
    return new Promise(resolve => {
        csInterface.evalScript(`switchPreview()`,() => {
            resolve();
        });
    })
}