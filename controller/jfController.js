const mysql = require('mysql');
let db=mysql.createConnection({
    host:'172.17.2.251',
    port:'3306',
    user:'root',
    password:'123456',
    database:'pro3dist',
    timezone:'08:00'
});
function handsTime(obj) {
    var a = obj.getFullYear(); /* 获取年 */
    var b = obj.getMonth() + 1 < 10 ? "0" + (obj.getMonth() + 1) : obj.getMonth() + 1; /* 获取月 */
    var c = obj.getDate() < 10 ? "0" + obj.getDate() : obj.getDate(); /* 获取日 */
    var d = obj.getHours() < 10 ? "0" + obj.getHours() : obj.getHours(); /* 获取小时 */
    var e = obj.getMinutes() < 10 ? "0" + obj.getMinutes() : obj.getMinutes(); /* 获取分 */
    var f = obj.getSeconds() < 10 ? "0" + obj.getSeconds() : obj.getSeconds(); /* 获取秒 */
    return {
        a,
        b,
        c,
        d,
        e,
        f
    }
}
let json={
    getNews:function(req,res){
        const query = req.query.category
        console.log(
            query? 
            (query == "全部新闻"
                ? "%"
                :query)
            :
             "%"
        )
        let sql=    
        `select a.id,a.type,a.title,a.prevCon,a.time,a.url,a.click,a.tag,count(b.zx_id) num from zx a left join ept b  
        on  a.id=b.zx_id  where  
        a.type like "${ query? (query == "全部新闻"? "%": query):"%"}" 
        group by a.id limit 10`;
        db.query(sql,function(err,data){
            if(err){
                res.send({error:'暂时无新闻!'+ err})
            }else{
                res.send({data:data})
            }
        })
    },
    getHotPlayer:function (req,res) {
        const sql='select x_user.showimg1,x_user.name,x_user.field, count(x_user.id) num from x_user left join order2 on x_user.id = order2.acp_id where order2.order_sta="已完成"group by x_user.id order by num desc limit 3';
        db.query(sql,function (err,data) {
            if(err){
                res.send({error:'获取主播错误！'+ err})
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    getHotNews:function (req,res) {
        const sql='select title,url,prevCon from zx order by click limit 5';
        db.query(sql,function (err,data) {
            if(err){
                res.send({error:'获取热点错误！'+ err})
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    getNewsCon:function (req,res) {
        const sql=`select a.id,a.type,a.title,a.prevCon,a.time,a.click,a.tag,count(b.zx_id) num from zx a left join ept b on a.id=b.zx_id where a.id=${req.query.id} or a.id=${req.query.id}+1 or a.id=${req.query.id}-1 group by a.id`;
        db.query(sql,function (err,data) {
            if(err){
                res.send({error:'获取新闻错误！'+ err})
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    getDiscussInfo:function (req,res) {
        const sql=`SELECT a.*,b.nickname FROM ept a LEFT JOIN x_user b ON a.u_id=b.id WHERE a.zx_id=${req.query.id}`;
        db.query(sql,function (err,data) {
            if(err){
                res.send('获取评论失败！'+err)
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    sendDiscuss:function (req,res) {
        var myDate = new Date();
        var {a,b,c,d,e,f}=handsTime(myDate);
        var data=req.body;
        var str=`${a}-${b}-${c} ${d}:${e}:${f}`;
        console.log(str);
        const sql=`insert into ept values("",${data.userId},${data.newsId},'${str}',"${data.msg}","${data.userImg}",null,null,null)`;
        db.query(sql,function (error,data) {
            if(error){
                console.log(error);
                res.send({error:1,data:'评论失败！'})
            }else{
                res.send({error:0,data:'评论成功！'})
            }
          })
      }
}
module.exports = json;