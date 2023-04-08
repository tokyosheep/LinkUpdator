/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function hostScript (obj) {
    return JSON.stringify(switchFuncs(obj));
};


function switchPreview (obj/*{isDebug: boolean}*/) {
    //if the document hasn't been saved, it unables to save the document.
    if(app.activeDocument.saved){
        //switching preview just for unabling to save the document.
        app.executeMenuCommand("preview");
        app.executeMenuCommand("preview");
        if(obj.isDebug)alert('ドキュメントの状態を保存化できるようにしました。');
    }
};

function getHomeDirectoryPath () {
    try {
        return JSON.stringify({
            status: 'success',
            param: {
                desktop: decodeURI(Folder.desktop.toString()),
                myDocuments: decodeURI(Folder.myDocuments.toString())
            }
        })
    } catch (e) {
        alert(e);
        return JSON.stringify({
            status: 'error',
            param: e.message
        })
    }
}