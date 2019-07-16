const mysql = require('mysql');
let db=mysql.createConnection({
    host:'172.17.2.251',
    port:'3306',
    user:'root',
    password:'123456',
    database:'pro3dist',
    timezone:'08:00'
});
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
        const sql=`select b.headerimg,b.name,a.text,a.time from ept a left join x_user b on a.zx_id=b.id where a.zx_id=${req.query.id}`;
        db.query(sql,function (err,data) {
            if(err){
                res.send('获取评论失败！'+err)
            }else{
                res.send({error:0,data:data})
            }
        })
    }
}
module.exports = json;