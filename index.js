// https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

var express = require('express');
var app = express();

let comments = []; // array of comments : 게시판용 DB(컴퓨터 off 되면 초기화)) 
app.use(express.json()) // for parsing application/json : post 방식 body 파싱 용도
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded : post 방식 body 파싱 용도

// set the view engine to ejs :  viewes폴더에 index.ejs를 만들어 사용 
app.set('view engine', 'ejs');  // ejs 파일을 만들어서 render로 응답에 실어 보낼 수 있음

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('index', {num: 3} );  // 여기서 index의 의미는 views/index.ejs를 의미함; num은 index.ejs에서 사용할 변수
});

// get
app.get('/create_get', function(req, res) {
    console.log(req.query);
    res.send('hi');
  });
  
// post
app.post('/create_post', function(req, res) {
    console.log(req.body);
    const { content } = req.body;
    comments.push(content);
    console.log(comments);
  });


app.listen(3000);
console.log('Server is listening on port 3000');