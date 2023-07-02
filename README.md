# cbmc.js
<div align="center">
    <p>
        <a href="https://www.npmjs.com/package/cbmc-js"><img src="https://img.shields.io/npm/v/cbmc-js.svg?maxAge=3600" alt="npm version" /></a>
        <a href="https://www.npmjs.com/package/cbmc-js"><img src="https://img.shields.io/npm/dt/cbmc-js.svg?maxAge=3600" alt="npm downloads" /></a>
    </p>
</div>
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

// 監聽文章更新事件，並在文章更新時執行某些操作
cbmc.onPost((updateTime) => {
  console.log(`New post updated at ${updateTime}`);
  // 在文章更新時做些什麼事情...
});

// 取得最新的幾篇文章
(async () => {
  const postList = await cbmc.getPostList(5); // 取得最新的 5 篇文章
  if (postList) {
    console.log(postList.posts); // 輸出文章清單
  }
})();

// 取得指定文章
(async () => {
  const post = await cbmc.getPost('1234'); // 取得 platformId 為 '1234' 的文章
  if (post) {
    console.log(post); // 輸出文章詳細資訊
  }
})();
```