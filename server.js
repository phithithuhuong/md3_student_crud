// const http = require('http');
// const  fs= require('fs');
// let  server= http.createServer((req, res) => {
//     res.write('xin Chao');
//     res.end();
// })
// server.listen(9999,()=>{
//     console.log('server is running http://localhost:9999')
// })
const http = require('http');
const url = require('url');
const router = require('./controller/router');
const notRoundHandle = require('./controller/handle/notFoundHandleRouter');
const fs = require("fs");
const typeFile = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/tff',
    'woff': 'font/woff',
    'woff2': 'font/woff',
    'eot': 'application/vnd.ms-fontobject'
}

const server = http.createServer((req, res) => {
    let pathName = url.parse(req.url, true).pathname;//"/home"
    const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if (checkPath){
        const contentType = typeFile[checkPath[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': contentType});
        fs.createReadStream(__dirname + req.url).pipe(res);

    } else {
        const arrPath = pathName.split('/');
        let trimPath = '';
        let id = '';
        if (arrPath.length === 2) {
            trimPath = arrPath[arrPath.length - 1];
        } else {
            trimPath = arrPath[arrPath.length - 2];
            id = arrPath[arrPath.length - 1];
        }
        let chosenHandle;
        if (typeof router[trimPath] === 'undefined') {
            chosenHandle = notRoundHandle.handleNotFound;
        } else {
            chosenHandle = router[trimPath];
        }
        chosenHandle(req, res, id);
    }
});
server.listen(9999, () => {
    console.log('Server is running http://localhost:9999/home!')
});

