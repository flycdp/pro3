const express=require('express');
const route=express.Router();
const jf=require('./../controller/jfController.js')

route.get('/getNews',jf.getNews);
route.get('/getHotPlayer',jf.getHotPlayer);
route.get('/getHotNews',jf.getHotNews);
route.get('/getNewsCon',jf.getNewsCon);
route.get('/getDiscussInfo',jf.getDiscussInfo);

module.exports = route;