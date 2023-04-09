# cbmc.js
## 關於
這是一個用於麥塊匿名發文平台的 npm package。  
## 安裝方法
```js
npm install cbmc-js
```
## 使用方法
以下是一個基礎的程式，展示了此 package 的所有功能。  
```js
const cbmc = require('cbmc-js');

// 當新文章發布時自動推送文章。
async function on_post(updated) {
  console.log(`讀取到新的文章：\n${updated}`);
}
cbmc.onpost({ on_update: on_post });


// 取得一定數量的文章列表，最大限制為300。
cbmc.post_list(1)
  .then((postList) => {
    console.log(postList);
  })
  .catch((err) => {
    console.error(err);
  });

// 使用編號指定文章，如果無此文章則會返回 None。
cbmc.get_post(1)
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.error(err);
  });
```