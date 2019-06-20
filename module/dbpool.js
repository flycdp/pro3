const mysql=require('mysql');
const yhb=require('./yhb.js');
const hlx=require('./hlx.js');
const fy=require('./fy.js');
const jf=require('./jf.js');
const ljy=require('./ljy.js');
const wq=require('./wq.js')
const dbPool={
    pool:null,
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456',
        database:'pro3'
    },
    
    create(){
        this.pool=mysql.createPool(this.config);
        console.log('连接池已启动');
    },
    yhb,
    hlx,
    fy,
    jf,
    ljy,
    wq,
    login(){
        return 'select * from t_user where u_name=? and u_pwd=?'
    },
    reg(){
        return ['select * from t_user where u_name=?','insert into t_user values(null,?,?)']
    },
    
    connect(sql,arr,fn){
        this.pool.getConnection((err,connection)=>{
            connection.query(sql,arr,fn);
            connection.release();
        })
    }
}
dbPool.create();
module.exports=dbPool;