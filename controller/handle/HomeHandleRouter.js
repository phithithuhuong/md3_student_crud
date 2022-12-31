const fs = require('fs');
const studentService = require('../../service/studentService')
const qs = require('qs');
const pointService = require('../../service/pointService');


class HomeHandleRouter {
    static getHomeHtml(homeHtml, sinhvien) {

        let tbody = ''
        sinhvien.map((sinhvien, index) => {
            tbody += ` <tr>
        <td>${index + 1}</td>
        <td>${sinhvien.name}</td>
        <td>${sinhvien.age}</td>
        <td>${sinhvien.address}</td>
        <td> ${sinhvien.namePoint}</td>
        <td>
         <a href="/edit/${sinhvien.id}"> <button style="background-color: green; color: white">Edit</button></a>  
        </td>
        <td>
           <a href="/delete/${sinhvien.id}"> <button style="background-color: green; color: white">Delete</button></a>
        </td>
    </tr>`

        })
        homeHtml = homeHtml.replace('{student}', tbody);
        return homeHtml;
    }
    showHome(req,res){
        if (req.method === 'GET') {
            fs.readFile('./views/home.html', 'utf8', async (err, homeHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let student = await studentService.findAll();
                    homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, student);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    console.log(search.search)
                    fs.readFile('./views/home.html', 'utf-8', async (err, homeHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let students = await studentService.searchSinhVien(search.search)
                            homeHtml =
                                HomeHandleRouter.getHomeHtml(homeHtml, students);
                            res.writeHead(200, 'text/html');
                            res.write(homeHtml);
                            res.end();
                        }
                    })
                }
            })
        }
        }
    createStudent(req,res){
            if (req.method === 'GET') {
                fs.readFile('./views/create.html', 'utf8', async (err, createHtml) => {
                    if (err) {
                        console.log(err.message)
                    } else {
                        res.writeHead(200, 'text/html');
                        let points = await pointService.find();
                        let options = ''
                        points.map(diem => {
                            options += `         
        <option value="${diem.idPoint}">${diem.namePoint}</option>
          
`
                        })
                        createHtml= createHtml.replace('{point}',options)
                        res.write(createHtml);
                        res.end();
                    }
                })

            } else {
                let data = ''
                req.on('data', chunk => {
                    data += chunk;

                })
                req.on('end', async err => {
                    if (err) {
                        console.log(err)
                    } else {
                        const student = qs.parse(data);
                        console.log(student)
                        const mess = await studentService.save(student);
                        console.log(mess);
                        res.writeHead(301, {'location': '/home'});
                        res.end();
                    }
                })
            }
        }




    async deleteStudent(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/delete.html', 'utf-8', (err, deleteHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id);
                    res.write(deleteHtml);
                    res.end();
                }
            })

        } else {
            let mess = await studentService.remove(id)
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }

    editStudent(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/edit.html', 'utf8', async (err, editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let sinhvien = await studentService.finById(id);
                    editHtml = editHtml.replace('{name}', sinhvien[0].name)
                    editHtml = editHtml.replace('{age}', sinhvien[0].age)
                    editHtml = editHtml.replace('{address}', sinhvien[0].address);
                    editHtml = editHtml.replace('{id}', sinhvien[0].id);
                    res.writeHead(200, 'text/html');

                    res.write(editHtml);
                    res.end();
                }
            })

        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk;

            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const sinhvien = qs.parse(data);
                    const mess = await studentService.saveEdit(sinhvien, id);
                    console.log(mess);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }

    }


}
module.exports= new HomeHandleRouter()