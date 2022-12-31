
const mysql= require('mysql')

class Connection {
    configToMySQL = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        charset: 'utf8_general_ci',
        database: 'student'

    }
    getConnection(){
        return mysql.createConnection(this.configToMySQL)
    }
    connection(){
        this.getConnection().connect(err=>{
            if (err){
                console.log( err)
            } else {
                console.log( 'Connection success!!')
            }
        })
    }
}
module.exports= new Connection();