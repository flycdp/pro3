const mysql=require('mysql');
const yhb=require('./yhb.js');

const dbPool={
    pool:null,
    config:{
        host:'172.17.2.251',
        port:'3306',
        user:'root',
        password:'123456',
        database:'pro3dist'
    },
    
    create(){
        this.pool=mysql.createPool(this.config);
        console.log('连接池已启动');
    },
    login(){
        return 'select * from x_user where name=? and password=?'
    },
    loginphone(){
        return 'select * from x_user where telphone=?'
    },
    reg(){
        return ['select * from x_user where name=?','insert into x_user values(null,?,?)']
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