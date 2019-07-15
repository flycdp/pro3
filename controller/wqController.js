const db = require('../module/dbPool.js')
const loginController = {
    isUser(sql, arr) {
        return new Promise((resolve, reject) => {
            db.connect(sql, arr, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data.length) {
                        resolve(data)
                    } else {
                        reject(null);
                    }
                }
            })
        });
    },
    login(request, response) {
        key = Object.keys(request.body).length ? 'body' : 'query';
        let {
            user,
            pwd
        } = request[key];
        if (user == '') {
            response.send({});
            return;
        }
        const sql = db.login();
        const pro = loginController.isUser(sql, [user, pwd]);
        pro.then(data => {
            response.send(data);
        }).catch(err => {
            response.send('');
        })

    },
    loginphone(req, res) {
        let phone = req.body.phone;
        const sql = db.loginphone();
        const pro = loginController.isUser(sql, phone);
        pro.then(data => {
            res.send(data);
        }).catch(err => {
            res.send('');
        })
    },
    reg(request, response) {
        var key = Object.keys(request.body).length ? 'body' : 'query';
        let {
            user,
            pwd
        } = request[key];
        if (user == '' || pwd == '') {
            response.send({});
            return;
        }
        const sqlArr = db.reg();
        const pro = loginController.isUser(sqlArr[0], [user]);
        pro.then(data => {
            response.send(data[0].name + '已被注册');
            return false;
        }).catch(err => {
            if (!err) {
                return loginController.isUser(sqlArr[1], [user, pwd]);
            }
            return false
        }).then(data => {
            if (data) {
                response.send('注册失败');
            }

        }).catch(err => {
            response.send(`{"user":"${user}","pwd":"${pwd}"}`);
        })
    },
    lookOther(request, response) {
        var user=request.body.user;
        const sqlArr = db.reg();
        const pro = loginController.isUser(sqlArr[0], [user]);
        pro.then(data => {
            let json=[{
                nickname:data[0].nickname,
                headerimg:data[0].headerimg
            }]
            response.send(json);
        })
    }
}
module.exports = loginController;