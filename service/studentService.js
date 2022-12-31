const connection = require('../model/connection');
connection.connection()

class StudentService {

    findAll() {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from sinhVien
                                join diem p on sinhVien.idPoint = p.idPoint`;

            let connect = connection.getConnection();
            connect.query(sql, (err, sinhvien) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(sinhvien);
                }
            })
        })
    }

    save(sinhvien) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`insert into student.sinhvien(name, age, address, idPoint)
                           values ('${sinhvien.name}', ${sinhvien.age}, '${sinhvien.address}',
                                   ${sinhvien.idPoint})`, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Tạo Thành công !')
                }
            })
        })
    };

    remove(id) {
        let connect = connection.getConnection();
        let sql = `delete
                   from student.sinhvien
                   where id = ${id}`;
        return new Promise((resolve, reject) => {
            connect.query(sql, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Thành công !!!')
                }
            })
        })
    };

    saveEdit(student, id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`update sinhvien
                           set name    = '${student.name}',
                               age     = ${student.age} ,
                               address = '${student.address}'
                           where id = ${id}`, (err, students) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('đã sửa!')
                    resolve(students)
                }
            })
        })
    };

    finById(id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`SELECT *
                           FROM sinhvien
                           WHERE id = ${id} `, (err, sinhvien) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(sinhvien)
                }
            })
        })
    }

    searchSinhVien(search) {
        let connect = connection.getConnection();
        let sql = `select *
                   from sinhvien s
                            join diem d on s.idPoint = d.idPoint
                   WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, sinhvien) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(sinhvien);
                }
            })
        })
    }


}

module.exports = new StudentService()