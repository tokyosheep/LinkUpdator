/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function hostScript (obj) {
    return JSON.stringify(switchFuncs(obj));
}


function switchPreview () {
    //if the document hasn't been saved, it unables to save the document.
    if(app.activeDocument.saved){
        //switching preview just for unabling to save the document.
        app.executeMenuCommand("preview");
        app.executeMenuCommand("preview");
    }
}