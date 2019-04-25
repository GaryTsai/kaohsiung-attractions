# kaohsiung-attractions
### Data Source 
這裡的資料使用高雄資料平台所提供的的API資料(https://data.kcg.gov.tw/)
資料網址：　https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&limit=300

### Firebase Database
使用即時資料庫firebase作為資料庫，將景點資料匯入firebase，該資料庫特性在第一次存取檔案時會有延遲時間。
Firebase網址:https://firebase.google.com/

#### Bootstrap 4
使用Bootstrap 4作為樣式基底
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```
#### npm
`npm install bootstrap`
### main.js or router.js
JS
`import 'bootstrap';` 
CSS
`import BootstrapVue from 'bootstrap'` 
`Vue.use(BootstrapVue)`
#### 建立完專案需嵌入該設定才能連接資料庫
```
  <script src="https://www.gstatic.com/firebasejs/5.9.3/firebase.js"></script>
  <script>
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
      apiKey: "專案Key",
      authDomain: "專案ID.firebaseapp.com",
      databaseURL: "https://專案ID.firebaseio.com",
      projectId: "專案ID",
      storageBucket: "專案ID.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };
    firebase.initializeApp(config);
  </script>
```

###  Web design
透過六角學院所提供的樣式去切版。
樣式網址：https://hexschool.github.io/THE_F2E_Design/todolist/?fbclid=IwAR23uDFP9HqCsPJVx86WiWw3UjzMi0xyqjdAbflX4_QCJr1U1eqU2A_wtGI#artboard5
### Front framework
使用Vue作為前端框架，打包後上傳至firebase deploy
#### 安裝 Vue
`npm install -g vue-cli`
#### 建立檔案
`vue init webpack file-name`
#### Webpack 程式打包指令 

`npm run build`　　=> 產生打包檔dist 
#### Firebase deploy
`firebase init`　　=> 指定上傳檔案與專案位置
1. 選擇專案
2. 選擇 Host
3. 指定上傳檔案dist

`firebase deploy`　=> 上傳至專案位置
1. 查看完已佈署的網址
2. http://kaohsiung-tourist.firebaseapp.com/



