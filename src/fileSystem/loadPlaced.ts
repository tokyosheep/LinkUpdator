import { GetPlaceItems } from 'jsx-params';
import { ImageFullNames, ErrorParam } from 'jsx-recived';
import { SendHostScript } from './connect';

/**
 * load placed items on Illustrator document.
 * @returns {ImageFullNames|ErrorParam}
 */
export const loadPlacedItemsFromJSX:()=>Promise<ImageFullNames|ErrorParam> = async () => {
  const connectJsx = new SendHostScript();
  const o = await connectJsx.callHostScript<GetPlaceItems, ImageFullNames|ErrorParam>({
    funcType: 'getplacement'
  });
  return o;
};

/**
 * load status of active document.
 * @returns {ImageFullNames|false}
 */
export const loadCurrentStatus:()=>Promise<ImageFullNames|false> = async () => {
    const status = await loadPlacedItemsFromJSX();
    if (status.status === 'error') {
      console.log(status.param);
      return false;
    } else {
      return status;
    }
};