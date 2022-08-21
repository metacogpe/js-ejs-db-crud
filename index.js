// https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

var express = require('express');
var app = express();


app.use(express.json()) // for parsing application/json : post 방식 body 파싱 용도
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded : post 방식 body 파싱 용도

// let comments = []; // array of comments : 게시판용 DB(컴퓨터 off 되면 초기화)) 
// 위의 배열 대신에 DB 사용 : DB는 컴퓨터 off 되어도 데이터 유지
// https://sequelize.org/docs/v6/core-concepts/model-basics/
const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:'); // 메모리 방식
// https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
// 파일 방식으로 컴퓨터 off 되어도 데이터 유지
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
  });

const Comments = sequelize.define('Comments', {
  // Model attributes are defined here
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

(
    async () => {
        await Comments.sync();
        console.log("The table for the Comments model was just (re)created!");
    }
)();

// `sequelize.define` also returns the model
console.log(Comments === sequelize.models.Comments); // true


// set the view engine to ejs :  viewes폴더에 index.ejs를 만들어 사용 
app.set('view engine', 'ejs');  // ejs 파일을 만들어서 render로 응답에 실어 보낼 수 있음

// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {
    const comments = await Comments.findAll(); // 3) DB에서 데이터 가져오기
//   res.render('index', {num: 3} );  // 1) 여기서 index의 의미는 views/index.ejs를 의미함; num은 index.ejs에서 사용할 변수
    // console.log(comments); // DB에서 가져온 데이터 확인 : 객체 형태로 가져옴 -> index.ejs에서 객체를 content로 바꿔서 사용
    res.render('index', {comments: comments} );  // 2) 여기서 index의 의미는 views/index.ejs를 의미함; comments는 index.ejs에서 사용할 변수
});

// get
app.get('/create_get', function(req, res) {
    console.log(req.query);
    res.send('hi');
  });
  
// post
app.post('/create_post', async function(req, res) {
    console.log(req.body);
    const { content } = req.body;
    // comments.push(content);  // 배열이 아닌 DB에 저장하기 위해 주석처리, 아래의 DB에 저장하는 코드로 대체
    // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ : DB에 저장하는 코드(공식문서)
    // Create a new comment : ORM 방식
    const jane = await Comments.create({ content: content });
    console.log("Jane's auto-generated ID:", jane.id);
    res.redirect('/');
  });


app.listen(3000);
console.log('Server is listening on port 3000');