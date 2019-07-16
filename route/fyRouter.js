const express=require('express');
var multer = require('multer'); // v1.0.5
var upload = multer();
const fy=require('./../controller/fyController.js')
const route=express.Router();
route.post('/pages/myorder',fy.myorder);
route.post('/pages/daiorder',fy.daiorder);
route.post('/pages/jingorder',fy.jingorder);
route.post('/pages/yiorder',fy.yiorder);
route.post('/pages/userBal',fy.userBal);
route.post('/pages/tranDet',fy.tranDet);
route.post('/pages/recMoney',fy.recMoney);
route.post('/pages/Coupon',fy.Coupon);
route.post('/pages/unCoupon',fy.unCoupon);
route.post('/pages/mem',fy.mem);
route.post('/pages/minf',fy.minf);
module.exports = route;