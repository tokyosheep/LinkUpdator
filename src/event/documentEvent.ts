import fs from 'fs';
import { csInterface, init, alertFromJSX } from '../fileSystem/init';
import { loadCurrentStatus } from '../fileSystem/loadPlaced';
import { updateCheck } from '../fileSystem/checkUpdate';
import { switchPreview } from '../fileSystem/init';
import { analyzeJSXPath } from '../fileSystem/resolveFile';

import { Watchacher } from './watchImages';

const watcher = new Watchacher();

const checkUpdateImages = async() => {
    watcher.stopWatch();
    const status = await loadCurrentStatus();
    if(!status || !fs.existsSync(analyzeJSXPath(status.param.doc))) return;
    if (status.param !== null && await updateCheck(status.param)) {
        alertFromJSX('ドキュメント保存後に更新された画像があります。');
        await switchPreview();
    }
    if(status.param !== null) {
        watcher.beginWatch(status.param.doc, status.param.placeFullNames);
    }
};

export const DocumentEvent = () => {
    init();
    csInterface.addEventListener('documentAfterActivate', checkUpdateImages);
    csInterface.addEventListener('com.adobe.csxs.events.WindowVisibilityChanged', (e) => {
        if (!e.data) {
            watcher.stopWatch();
            csInterface.removeEventListener('documentAfterActivate', checkUpdateImages);
        } else {
            csInterface.addEventListener('documentAfterActivate', checkUpdateImages);
        }
    });
}