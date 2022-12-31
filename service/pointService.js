const connection = require('../model/connection');
connection.connection();

class PointService {
    find() {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from diem`;
            let connect = connection.getConnection();
            connect.query(sql, (err, points) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(points);
                }
            })
        })
    }
}

module.exports = new PointService();