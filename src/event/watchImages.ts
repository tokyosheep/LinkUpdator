import * as chokidar from 'chokidar';
import { analyzeJSXPath } from '../fileSystem/resolveFile';
import { alertFromJSX, switchPreview } from '../fileSystem/init';

export class Watcher {
    private activeDoc: string|null;
    private images: string[];
    private watcher:chokidar.FSWatcher|null;
    constructor () {
        this.activeDoc = null;
        this.images = [];
        this.watcher = null;
    }

    beginWatch (doc:string, images:string[]) {
        this.images = images.map(img => analyzeJSXPath(img));
        this.activeDoc = doc;
        console.log(chokidar);
        this.watcher = chokidar.watch(this.images, {
          persistent: true,
          ignoreInitial: true,
          depth: 1
        });
        this.watcher
        .on('ready', () => console.log('ready'))
        .on('change', async (watchedPath) => {
            console.log('changed');
            // alert detecting update of image.
            // await alertFromJSX('画像が更新されました。');
            await switchPreview();
        })
        .on('error', async err => await alertFromJSX(err).then());
    }

    async stopWatch () {
      if(this.watcher !== null) await this.watcher.close();
      console.log('closed', this.watcher);
    }

    reSetImages (newImages:string[]) {
      if (this.watcher === null)return;
      this.watcher.unwatch(this.images);
      console.log('before replace' ,this.watcher);
      this.images = newImages;
      this.watcher.add(this.images);
      console.log('after placed', this.watcher);
    }
}