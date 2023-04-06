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
    for (var i = 0; i < places.length; i++) {
        placeFullNames.push((decodeURI(places[i].file.fullName.toString())));
    }
    return {
        status: 'success',
        param: {
            placeFullNames: placeFullNames,
            doc: decodeURI(app.activeDocument.fullName.toString())
        }
    };
}