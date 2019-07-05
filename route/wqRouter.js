const express=require('express');
const AV = require("leancloud-storage");
const con = require("../controller/wqController");


// vdrtcdqucdzsbcfg
const APP_ID = 'iPk2lTRJhUijqIOiI8llQb0L-gzGzoHsz';
const APP_kEY = '3GFSAdWKewmIqpa0Jr2Ibt3a';
const Master_Key = '0alx3SkcuX18qyMCodtY1O8J';
AV.init({
    appId: APP_ID,
    appKey: APP_kEY,
    masterKey: Master_Key
});
const smsController = {
    //验证码发送
    sendCode(req, res) {
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: req.body.phone,  // 目标手机号
            name: '大腿陪玩',       // 应用名称
            op: '请勿回复此短信',                          // 登录
            ttl: 5 //有效时间
        }).then(function () {
            //调用成功e

            res.send("发送成功")

        }, function (err) {
            //调用失
            console.log(err);
            res.send("发送失败")
        })
    },
    //短信验证
    verSms(req, res) {
        AV.Cloud.verifySmsCode(req.body.code, req.body.phone)
            .then(function () {
                //调用成功
                console.log('验证成功');
                con.loginphone(req,res);
            }, function (err) {
                //调用失败
                res.send("验证失败")
            })
    }
};
const route=express.Router();
route.post('/yzm.do',smsController.sendCode);
route.post('/zd.do',smsController.verSms);
route.post('/login',con.login);

module.exports = route;