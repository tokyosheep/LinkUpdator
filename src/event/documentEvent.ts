import fs from 'fs';
import { csInterface, init, alertFromJSX } from '../fileSystem/init';
import { loadCurrentStatus } from '../fileSystem/loadPlaced';
import { updateCheck } from '../fileSystem/checkUpdate';
import { switchPreview } from '../fileSystem/init';
import { analyzeJSXPath, HomeDirectoryReplacer } from '../fileSystem/resolveFile';

import { Watcher } from './watchImages';

const timeLag:(number:number)=>Promise<void> = (number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, number);
    })
}

type VisibleLayerFunc = (flag:boolean)=>void;

const watcher = new Watcher();

/**
 *
 *
 * @param {HomeDirectoryReplacer} replacer 
 * @return {Promise<void>} 
 * the function updates watch and document status.
 * 
 */
const checkUpdateImages:(replacer:HomeDirectoryReplacer, visibleOverLayer:VisibleLayerFunc)=>Promise<void> = async(replacer, visibleOverLayer) => {
    try {
      watcher.stopWatch();
      const status = await loadCurrentStatus();
      // parse Path string. ExtendScript and Node.js differently deals with directory path.
      if (status) {
          status.param.doc = replacer.replaceHomeDirectory(status.param.doc);
          status.param.placeFullNames = status.param.placeFullNames.map(name => replacer.replaceHomeDirectory(name));
      }
      //if document unsaved any directory, it stops to inspect anymore.
      if(!status || !fs.existsSync(analyzeJSXPath(status.param.doc))) return;
      if (status.param !== null && await updateCheck(status.param)) {
          alertFromJSX('ドキュメント保存後に更新された画像があります。');
          visibleOverLayer(true);
          await timeLag(100);
          await switchPreview();
          await timeLag(2000);
          visibleOverLayer(false);
      }
      //begin to watch placed images.
      if(status.param !== null) {
          console.log('begin');
          watcher.beginWatch(status.param.placeFullNames);
      }
      console.log(status.param !== null);
    } catch (e) {
        console.log('error update function');
        console.log(e);
    }
};

/**
 * after saving document, update replaced items list
 * @param replacer HomeDirectoryReplacer
 * @returns {Promise<void>}
 */
const afterSavingUpdate = async (replacer) => {
    const status = await loadCurrentStatus();
    console.log('saved status');
    if (!status) return;
    //if the Panel detected unlinked image, it warns.
    if (status.param !== null && status.param.hasUnlinked) {
        alertFromJSX('リンクの外れた画像があります。');
    }
    console.log('saved update', status);
    await watcher.reSetImages(status.param.placeFullNames.map(img => replacer.replaceHomeDirectory(img)));
}

/**
 * 
 * @param {HomeDirectoryReplacer} replacer
 * set event at the beginning open the panel.
 * after panel's visibility, it adds event.
 * after panel's invisibility, it removes event. 
 */
export const DocumentEvent = async (replacer:HomeDirectoryReplacer, visibleOverLayer:VisibleLayerFunc) => {
    await init();
    await replacer.setHomeDirectory();
    csInterface.addEventListener('documentAfterSave', () => afterSavingUpdate(replacer));
    csInterface.addEventListener('documentAfterActivate', () => checkUpdateImages(replacer, visibleOverLayer));
    csInterface.addEventListener('com.adobe.csxs.events.WindowVisibilityChanged', (e) => {
        if (!e.data) {
            watcher.stopWatch();
            csInterface.removeEventListener('documentAfterActivate', () => checkUpdateImages(replacer, visibleOverLayer));
            csInterface.addEventListener('documentAfterSave', () => afterSavingUpdate(replacer));
        } else {
            csInterface.addEventListener('documentAfterActivate', () => checkUpdateImages(replacer, visibleOverLayer));
            csInterface.addEventListener('documentAfterSave', () => afterSavingUpdate(replacer));
        }
    });
};