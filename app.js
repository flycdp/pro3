const express=require('express');
const favicon=require('serve-favicon');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const app=express();
const yhbRouter=require('./route/yhbRouter.js');
const jfRouter=require('./route/jfRouter.js');
const ljyRouter=require('./route/ljyRouter.js');
const fyRouter=require('./route/fyRouter.js');
const wqRouter=require('./route/wqRouter.js');
const hlxRouter=require('./route/hlxRouter.js');
const ejs=require('ejs');
app.use(yhbRouter);
app.use(jfRouter);
app.use(ljyRouter);
app.use(fyRouter);
app.use(wqRouter);
app.use(hlxRouter);

app.use(morgan('dev'));
//post读取数据
app.use(bodyParser.urlencoded({
    extended: false
})); //false为简单处理，true为更高级别的文件处理
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public/html'));
app.use(favicon(__dirname+'/public/images/favicon.ico'));

/* ejs引擎 */
app.engine('html',ejs.__express)
app.set('views', __dirname + '/view');
app.set("view engine","html");//视图的引擎

app.listen(80,()=>{
    console.log('80端口已开启');
})