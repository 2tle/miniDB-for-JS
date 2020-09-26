# miniDB-for-JS
처음 사용할 때는 `testDB`를 삭제한 후 사용해주세요.
miniDB는 가볍게 사용할 수 있는 NoSQL DB입니다.

## 설치방법
miniDB 디렉터리를 다운받아 사용할 프로젝트에 넣어주세요.
```
projectFolder
|_ node_modules
|_ miniDB
|_ index.js
|_ package.json
```
처음 사용할 때에는 miniDB > databases > testDB 를 삭제한 후 사용해주세요.

## 사용방법

먼저, miniDB 내에 있는 miniDB.js를 import 해주세요.
```
const miniDB = require('./miniDB/miniDB.js');
```

### createCollection(collectionName)
collectionName 컬렉션을 생성합니다. 컬렉션 생성에 성공하면 true를, 실패하면 false를 반환합니다.
Example 
```
const miniDB = require('./miniDB/miniDB.js');

const result = miniDB.createCollection('testDB'); 

```
### deleteCollection(collectionName)
collectionName 컬렉션을 지웁니다. 지우기에 성공하면 true를, 실패하면 false를 반환합니다.
Example
```
const miniDB = require('./miniDB/miniDB.js');

const result = miniDB.deleteCollection('testDB'); 
```
### getCollection()
현재 존재하는 컬렉션들을 배열 형태로 반환합니다.
Example
```
const miniDB = require('./miniDB/miniDB.js');

const result = miniDB.getCollection('testDB'); 
```

### create(collectionName, data)
collectionName 컬렉션에 data를 저장합니다. 저장에 성공하면 생성된 문서의 uuid값을, 실패시 false를 반환합니다.
createCollection 함수를 사용하지 않아도 create 함수 사용시 자동으로 컬렉션을 생성합니다. data는 json 형식입니다.
Example
```
const miniDB = require('./miniDB/miniDB.js');
const result = miniDB.create('testDB',{
    username: '2tle',
    date: '2005-01-14',
});
```

### read(collectionName, condition)
collectionName 컬렉션에서 condition 조건에 일치하는 문서들을 json으로 반환합니다.
모든 문서를 읽을 경우, condition 값을 {} 으로 해주세요.
Example
```
const miniDB = require('./miniDB/miniDB.js');
const result = miniDB.read('testDB',{username: '2tle'});
```

### update(collectionName, condition, update)
collectionName 컬렉션에서 conditon 조건에 일치하는 문서들을 update JSON의 값으로 수정합니다. 수정에 성공시 true를, 실패시 false를 반환합니다.
모든 문서를 수정할 경우, condition 값을 {} 으로 해주세요.
Example
```
const miniDB = require('./miniDB/miniDB.js');
const result = miniDB.update('testDB',{username: '2tle'},{date: '2005-01-15'});
```

### del(collectionName, condition)
collectionName 컬렉션에서 condition 조건에 일치하는 문서들을 삭제합니다. 삭제에 성공시 true를, 실패시 false를 반환합니다.
모든 문서를 삭제할 경우, condition 값을 {} 으로 해주세요.
Example
```
const miniDB = require('./miniDB/miniDB.js');
const result = miniDB.del('testDB',{username: '2tle'});
```







