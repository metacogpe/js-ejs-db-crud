// https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

var express = require('express');
var app = express();

// set the view engine to ejs :  viewes폴더에 index.ejs를 만들어 사용 
app.set('view engine', 'ejs');  // ejs 파일을 만들어서 render로 응답에 실어 보낼 수 있음

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('index', {num: 3} );  // 여기서 index의 의미는 views/index.ejs를 의미함; num은 index.ejs에서 사용할 변수
});


app.listen(3000);
console.log('Server is listening on port 3000');