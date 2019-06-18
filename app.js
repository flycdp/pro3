const express=require('express');
const favicon=require('serve-favicon');
const bodyParse=require('body-parser');
const morgan=require('morgan');
const app=express();
app.use('')
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public/html'));
app.use(express.static(__dirname+'/public/images/favicon.ico'));
app.listen(80,()=>{
    console.log('80端口已开启');
})