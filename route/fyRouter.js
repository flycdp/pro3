const express=require('express');
var multer = require('multer'); // v1.0.5
var upload = multer();
const fy=require('./../controller/fyController.js')
const route=express.Router();
route.post('/myorder',fy.myorder);
route.post('/daiorder',fy.daiorder);
route.post('/jingorder',fy.jingorder);
route.post('/yiorder',fy.yiorder);
route.post('/userBal',fy.userBal);
route.post('/tranDet',fy.tranDet);
route.post('/recMoney',fy.recMoney);
route.post('/Coupon',fy.Coupon);
route.post('/unCoupon',fy.unCoupon);
route.post('/mem',fy.mem);
/*route.post('/minf',fy.minf);*/
module.exports = route;