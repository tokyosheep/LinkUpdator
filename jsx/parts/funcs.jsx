function switchFuncs(obj/*{funcType: string, params:Object}*/){
    try {
        switch (obj.funcType) {
            case 'getplacement':
            return investigateImages();

            default:
            return {
                status: 'error',
                param: 'invlid func value'
            }
        }
    } catch (e) {
        return {
                status: 'error',
                param: e.message
            }
    }
}

function investigateImages () {
    if(app.documents.length < 1)return { status: 'success', param: null};
    var places = app.activeDocument.placedItems;
    var placeFullNames = [];
    var unlinkFlag = false;
    for (var i = 0; i < places.length; i++) {
        try {
            placeFullNames.push((decodeURI(places[i].file.fullName.toString())));
        } catch (e) {
            unlinkFlag = true;
            placeFullNames.push('unlinked image');
        }
    }
    return {
        status: 'success',
        param: {
            placeFullNames: placeFullNames,
            doc: decodeURI(app.activeDocument.fullName.toString()),
            hasUnlinked: unlinkFlag
        }
    };
}