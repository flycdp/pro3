var mysql=require('mysql')
var db=mysql.createConnection({
    host     : '172.17.2.251',
    user     : 'root',
    password : '123456',
    database : 'pro3dist',
    timezone :"08:00"
});
var json={

    myorder:function (req,res) {
        var user_id=req.body.user_id;
        var sql=`SELECT * FROM order2,player,x_user,yhj,yhjlx,service_type WHERE order2.user_id=${user_id} AND order2.acpkey_id=player.id AND x_user.id=player.id_user AND service_type.id=player.game_id 
AND order2.user_id=yhj.user_id AND yhj.id_yhjlx=yhjlx.id AND order2.yhj_id=yhj.id`;
        db.query(sql,function (err,data) {
            console.log(data)
           if(err){
                console.log('数据出错'+err)
           }else {
                res.send({error:0,data:data})
           }
        })

    },
    daiorder:function (req,res) {
        var user_id=req.body.user_id;
        var sql=`SELECT * FROM order2,player,x_user,yhj,yhjlx,service_type WHERE order2.user_id=${user_id} AND order2.order_sta="待付款" AND order2.acpkey_id=player.id AND x_user.id=player.id_user AND service_type.id=player.game_id 
AND order2.user_id=yhj.user_id AND yhj.id_yhjlx=yhjlx.id AND order2.yhj_id=yhj.id`;
        db.query(sql,function (err,data) {
            console.log(data)
            if(err){
                console.log('数据出错'+err)
            }else {
                res.send({error:0,data:data})
            }
        })
    },
    jingorder:function (req,res) {
        var user_id=req.body.user_id;
        var sql=`SELECT * FROM order2,player,x_user,yhj,yhjlx,service_type WHERE order2.user_id=${user_id} AND order2.order_sta="进行中" AND order2.acpkey_id=player.id AND x_user.id=player.id_user AND service_type.id=player.game_id 
AND order2.user_id=yhj.user_id AND yhj.id_yhjlx=yhjlx.id AND order2.yhj_id=yhj.id`;
        db.query(sql,function (err,data) {
            console.log(data)
            if(err){
                console.log('数据出错'+err)
            }else {
                res.send({error:0,data:data})
            }
        })
    },
    yiorder:function (req,res) {
        var user_id=req.body.user_id;
        var sql=`SELECT * FROM order2,player,x_user,yhj,yhjlx,service_type WHERE order2.user_id=${user_id} AND order2.order_sta="已完成" AND order2.acpkey_id=player.id AND x_user.id=player.id_user AND service_type.id=player.game_id 
AND order2.user_id=yhj.user_id AND yhj.id_yhjlx=yhjlx.id AND order2.yhj_id=yhj.id`;
        db.query(sql,function (err,data) {
            console.log(data)
            if(err){
                console.log('数据出错'+err)
            }else {
                res.send({error:0,data:data})
            }
        })
    },
    userBal:function (req,res) {
        var user_id=req.body.user_id;
        var sql=`SELECT * FROM x_user WHERE id=${user_id}`;
        db.query(sql,function (err,data) {
            if(err){
                console.log('数据出错'+err)
            }else {
                res.send({error:0,data:data})
            }
        })
    },
    tranDet:function (req,res) {
        var arr=[];
        var user_id=req.body.user_id;
        var sql=`SELECT * FROM recharge WHERE userId=${user_id}`;
        var sql2=`SELECT * FROM sendgift,givegift WHERE sendgift.userId=${user_id} AND sendgift.giftId=givegift.id`;
        var sql3=`SELECT * FROM order2,player,x_user,yhj,yhjlx,service_type WHERE order2.user_id=${user_id} AND order2.order_sta="已完成" AND order2.acpkey_id=player.id AND x_user.id=player.id_user AND service_type.id=player.game_id 
AND order2.user_id=yhj.user_id AND yhj.id_yhjlx=yhjlx.id AND order2.yhj_id=yhj.id`
        db.query(sql,function (err,data) {
            if(err){
                console.log('数据出错'+err)
            }else {
                for(var i=0;i<data.length;i++){
                    arr.push(data[i])
                }
                db.query(sql2,function (err,data) {
                    if (err){
                        console.log('数据出错'+err)
                    } else {
                        for (var j=0;j<data.length;j++){
                            arr.push(data[j])
                        }
                        db.query(sql3,function (err,data) {
                            if(err){
                                console.log('数据出错'+err)
                            }else {
                                for(var i=0;i<data.length;i++){
                                    arr.push(data[i])
                                }
                                res.send({error:0,data:arr})
                            }
                        })
                    }
                });
            }
        });
    },
    recMoney:function (req,res) {
        var moneydes=req.body.moneydes;
        var money=req.body.money;
        var user_id=req.body.user_id;
        var myDate = new Date();
        var timestamp2 = myDate.getTime();
        var date=myDate.toLocaleString();
        var sql=`INSERT INTO recharge(id,userId,rechargeNum,rechargeDate,moneyClass,moneyDes,CODE) VALUES(NULL,${user_id},${money},'${date}','进账','${moneydes}充值','DC${timestamp2}')`
        var sql2=`UPDATE x_user SET userBalm=userBalm+${money} WHERE id=${user_id};`
        db.query(sql,function (err,data) {
            if(err){
                console.log('数据库出错')
            }else {
                db.query(sql2,function (err,data) {
                    if(err){
                        console.log('数据库出错')
                    }else {
                        res.send('充值成功')
                    }
                })
            }
        })

    },
    Coupon:function (req,res) {
        var user_id=req.body.user_id;
        var oDate=new Date();
        var timestamp2 = oDate.getTime();
        var arr=[]
        var sql=`SELECT * FROM yhj,yhjlx WHERE user_id=${user_id} AND yhj.id_yhjlx=yhjlx.id`;
        db.query(sql,function (err,data) {
            if(err){
                console.log('数据库出错'+err)
            }else{
                for (var i=0;i<data.length;i++){
                    var num = (new Date(Date.parse(data[i].time.replace(/-/g,"/")))).getTime()
                    if(num>timestamp2){
                        arr.push(data[i]);
                    }
                }
                res.send({error:0,data:arr})
            }
        })
    },
    unCoupon:function (req,res) {
        var user_id=req.body.user_id;
        var oDate=new Date();
        var timestamp2 = oDate.getTime();
        var arr=[];
        var sql=`SELECT * FROM yhj,yhjlx WHERE yhj.user_id=${user_id} AND yhj.id_yhjlx=yhjlx.id`;
        db.query(sql,function (err,data) {
            if(err){
                console.log('数据库出错'+err)
            }else{
                for (var i=0;i<data.length;i++){
                    var num = (new Date(Date.parse(data[i].time.replace(/-/g,"/")))).getTime();
                    if(num<timestamp2){
                        arr.push(data[i]);
                    }
                }
                res.send({error:0,data:arr})
            }
        })
    },
    mem:function (req,res) {
        var user_id=req.body.user_id;
        var sql=`SELECT SUM(rechargeNum) AS recTotal FROM recharge WHERE userId=${user_id}`;
        db.query(sql,function (err,data) {
            if(err){
                console.log('数据库出错')
            }else {
                res.send({error:0,data:data})
            }
        })
    },
   /* minf:function (req,res) {
        var user_id=req.body.user_id;
        var sql=``
    }*/


};

module.exports = json;