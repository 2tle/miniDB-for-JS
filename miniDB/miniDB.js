const fs = require('fs');
const uuidv4 = require('./modules/uuidv4');
const path = require('path');

function getDbPath(collectionName) { 
    try {
        fs.statSync(__dirname + '/databases/' + collectionName + '/');
    } catch (err) {
        if (err.code === "ENOENT") {
            const rt = createCollection(collectionName);
            return __dirname + '/databases/' + collectionName + '/';
        }
    }
    return __dirname + '/databases/' + collectionName + '/';
}

function createCollection(collectionName) {
    let generate = fs.mkdirSync(__dirname + '/databases/' + collectionName + '/');
    if (!generate) return false;
    else return true;
}


function ifChecker(js1, js2) {
    const js2Key = Object.getOwnPropertyNames(js2);
    const js2KeyLength = js2Key.length;
    let cnt = 0;
    js2Key.forEach(function (e) {
        try {
            if (js1[e] == js2[e]) {
                cnt = cnt + 1;
            }
        } catch (e) {

        }
    });
    if (cnt == js2KeyLength) {
        return true;
    } else return false;
}


function read(collectionName, jsonI) {
    const dir = getDbPath(collectionName);
    let documentList = fs.readdirSync(dir);
    let readDocumentList = [];
    let readDocumentListJogun = [];
    for (let i in documentList) {
        if (path.extname(documentList[i]) === '.json') {
            let f1 = require(dir + documentList[i]);
            readDocumentList.push(f1);
        }
    }
    let a = {};
    a[collectionName] = readDocumentList;
    //return a; 
    if (JSON.stringify(jsonI) == JSON.stringify({})) return a;
    else {
        readDocumentList.forEach((e) => {
            let ifC = ifChecker(e, jsonI);
            if (ifC) readDocumentListJogun.push(e);

        });
        a[collectionName] = readDocumentListJogun;
        return a;
    }
}

function create(collectionName, json) {
    try {
        const dp = getDbPath(collectionName);
        if (json.hasOwnProperty('_id')) throw new Error("`_id` is miniDB's unique property");
        const uuid = uuidv4.uuidv4();
        json._id = uuid;
        const strJson = JSON.stringify(json);
        let returndt = fs.writeFileSync(dp + uuid + '.json', strJson);
        return uuid;
    } catch (e) {
        console.error(e);
        return false;
    }


}

function deleteCollection(collectionName) {
    try {
        const path = getDbPath(collectionName);
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                let curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {

                    deleteFolderRecursive(curPath);

                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    } catch (e) {
        return false;
    }
    return true;

}

function del(collectionName, jogunJson) {
    try {
        let readOneVal = read(collectionName, jogunJson);
        if (readOneVal.length == 1) { //fs.unLinkSync(path);
            const filePath = getDbPath(collectionName) + readOneVal._id + '.json';
            fs.unlinkSync(filePath);
        } else {
            readOneVal[collectionName].forEach((e) => {
                fs.unlinkSync(getDbPath(collectionName) + e._id + '.json');
            });
        }

        if (fs.readdirSync(__dirname + '/databases/' + collectionName + '/').length == 0) {
            fs.rmdirSync(__dirname + '/databases/' + collectionName + '/');
        }
    } catch (e) {
        return false;
    }
    return true;
}


function getCollection() {
    return fs.readdirSync(__dirname + '/databases/');
}

function update(collectionName, jogunJson, updateJson) {
    try {
        let readJson = read(collectionName, jogunJson)[collectionName];

        readJson.forEach((rJson) => {
            const rjKey = Object.getOwnPropertyNames(updateJson);
            const docsID = rJson._id;
            let docsJson = rJson;
            rjKey.forEach((e) => {
                docsJson[e] = updateJson[e];
            });
            fs.writeFileSync(getDbPath(collectionName) + docsID + '.json', JSON.stringify(docsJson));
        });
        return true;
    } catch (e) {
        return e;
    }

}



module.exports = {
    read: function (collectionName, json) { return read(collectionName, json); },
    create: function (cn, js) { return create(cn, js); },
    createCollection: function (cn) { return createCollection(cn); },
    deleteCollection: function (cn) { return deleteCollection(cn); },
    del: function (cn, js) { return del(cn, js); },
    getCollection: () => { return getCollection(); },
    update: (cn, js1, js2) => { return update(cn, js1, js2); }
};
