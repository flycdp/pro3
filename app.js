const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const yhbRouter = require('./route/yhbRouter.js');
const jfRouter = require('./route/jfRouter.js');
const ljyRouter = require('./route/ljyRouter.js');
const fyRouter = require('./route/fyRouter.js');
const wqRouter = require('./route/wqRouter.js');
const hlxRouter = require('./route/hlxRouter.js');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let offLineUser={
    aaaaaa:[],
    bbbbbb:[],
    cccccc:[],
    dddddd:[],
    eeeeee:[],
    ffffff:[]
};
/* 发送消息 */
io.on('connection', function (socket) {
    socket.on('connection',function(msg){
        console.log(msg.myName,offLineUser[msg.myName]);
        if(offLineUser[msg.myName]){/* 若已经是离线用户，并且有消息 */
            if(offLineUser[msg.myName].length){
                console.log(msg.myName);

                io.emit(msg.myName,offLineUser[msg.myName]);
                delete offLineUser[msg.myName];
            }
        }
        io.emit('con',msg)
    })
    socket.on('chat message', function (msg) {  //拿到消息给当前的用户
        let item=msg.name.otherName;
        msg.name.otherName=msg.name.myName;
        msg.name.myName=item;
        /* 判断发送的消息的接收用户是否下线 */
        let user=offLineUser[msg.name.myName];

        if(user){/* 若有说明下线 */
            let count=0;
            user.forEach(v => {
                if(v.name==item){/* 判断这个离线用户的消息是否有本人 */
                    count=1;
                    v.content.push({ time: msg.time, text: msg.text, type: "0"})
                    v.count++;
                }
            });
            if(count){
                v.push({
                    name: msg.name.otherName,
                    nickname:msg.name.otherNickname,
                    img: msg.img,
                    phone: msg.telphone,
                    cur: '',
                    count: 1,
                    content: [{
                        time: msg.time,
                        text: msg.text,
                        type: "0"
                    }]
                })
            console.log(user)
            }
        }else{
            io.emit(item,msg)
        }
    });
});
const ejs = require('ejs');
//post读取数据
app.use(bodyParser.urlencoded({
    extended: false
})); //false为简单处理，true为更高级别的文件处理
app.use(bodyParser.json());
app.use(yhbRouter);
app.use(jfRouter);
app.use(ljyRouter);
app.use(fyRouter);
app.use(wqRouter);
app.use(hlxRouter);

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

/* ejs引擎 */
app.engine('html', ejs.__express)
app.set('views', __dirname + '/view');
app.set("view engine", "html"); //视图的引擎

http.listen(80, () => {
    console.log('80端口已开启');
})