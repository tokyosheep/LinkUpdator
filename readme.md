[Japanese explanation is here](https://kawano-shuji.com/justdiary/?p=3068&preview=true)

# LinkUpdator Illustrator Extension datecting image update.

on Illustrator, it can be saved after editing on document. 
and after you saving document, it can't be saved because nothing any to overwritten.
Illustrator detects editing and what differences between initial status document and present status.
but in specific situation, Illustrator doesn't detect.

## Update placed Image

like you place bitmap image on ILlustrator, in case you need to edit it on Photoshop.
so you have to cross different apps but Illustrator only detects update of Illustrator document.
when it come to you edit and update placed bitmap image, Illustrator warns update on image but file save menu can't be clicked.
this makes serious problem someitme. because placed Image keeps old status on Illustrator docuemnt.


### This Extension dectecs update and makes saveable status.

Extension detects update of placed Image and automatically , makes saveable the document.
to be able to save , it needs editing or changing but just updating image, I suppose you wouldn't want to do anything to edit. but just switcing preview mode, Illustrator detects as a something change , and you can save docuemnt. that why after detecting update, Extension just switchs preview mode twice. so it looks no change at all but it makes saveable status.

### How detects update

chokidar, based on Node.js module can watch file update. and also CEP it has events itself.
like "after actevate document" or "after saved document".
it can detect update of placed image.

### specification
this is developed on webpack and few differences between development mode and production mode.

after detecting update of image, it alerts under development mode.
under production mode, it won't alert just switching preview mode.

### Note
I tested several times but any case of accident , I can't have resposibility.
please carefully use it in case you deal with your precious document.

![capture](./readmeImg/linkupdator.gif)